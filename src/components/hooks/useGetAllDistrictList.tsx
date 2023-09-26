import { useQuery } from "@tanstack/react-query";
import { Api, QueryKey } from "../api";
import { ApiClient } from "../api/client";
import { IDistrictDropdown } from "../models";

interface IRes {
  data: IDistrictDropdown[]
}

const districtDropdown = async () => {
  const res =  await ApiClient.get(Api.DistrictDropdown)
  return res?.data;
}

export function useGetAllDistrictList(){
    return useQuery<IRes, Error>({
        queryKey: [QueryKey.DistrictDropdown],
        queryFn:() => districtDropdown(),
        refetchOnWindowFocus: false,
    })
}