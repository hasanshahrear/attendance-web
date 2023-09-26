import { useQuery } from "@tanstack/react-query";
import { Api, QueryKey } from "../api";
import { ApiClient } from "../api/client";
import { IUpazilaDropdown } from "../models";

interface IRes {
  data: IUpazilaDropdown[]
}

const districtDropdown = async (id:string) => {
  const res =  await ApiClient.get(Api.UpazilaDropdown + `?district_id=${id}` )
  return res?.data;
}

export function useGetAllUpazilaByDistrict({id}:{id:string}){
    return useQuery<IRes, Error>({
        queryKey: [QueryKey.DistrictDropdown, id],
        queryFn:() => districtDropdown(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    })
}