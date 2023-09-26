import { useQuery } from "@tanstack/react-query";
import { Api, QueryKey } from "../api";
import { ApiClient } from "../api/client";
import { IUnion } from "../models";

interface IRes {
  data: IUnion[]
}

const unionDropdown = async (id:string) => {
  const res =  await ApiClient.get(Api.UnionDropdown + `?id=${id}` )
  return res?.data;
}

export function useGetAllUnionByUpazila({id}:{id:string}){
    return useQuery<IRes, Error>({
        queryKey: [QueryKey.UnionDropdown, id],
        queryFn:() => unionDropdown(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
    })
}