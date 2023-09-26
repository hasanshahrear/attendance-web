import { useQuery } from "@tanstack/react-query";
import { Api, QueryKey } from "../api";
import { ApiClient } from "../api/client";
import { IDesignationDropdown } from "../models";

interface IRes {
  data: IDesignationDropdown[]
}

const designationDropdown = async () => {
  const res =  await ApiClient.get(Api.DesignationDropdown)
  return res?.data;
}

export function useGetAllDesignationList(){
    return useQuery<IRes, Error>({
        queryKey: [QueryKey.DesignationDropdown],
        queryFn:() => designationDropdown(),
        refetchOnWindowFocus: false,
    })
}