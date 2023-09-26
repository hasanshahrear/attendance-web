import { ApiClient } from "@/components/api/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "./data-table";

interface IProps<TData, TValue>{
    columns: ColumnDef<TData, TValue>[];
    url: string;
    queryKey: string;
}

export function CustomDataTable<TData, TValue>({columns, url, queryKey}:IProps<TData, TValue>){
    const [page, setPage] = useState<number>(1)
    const [size, setSize] = useState<number>(10)

    const getData = async (page: number | string, size: number | string) => {
        const res = await ApiClient.get(url + "?page=" + page + "&size=" + size)
        return res?.data
      }
    const {data, isLoading, isError} = useQuery({
        queryKey: [queryKey, page, size],
        queryFn:() => getData(page, size),
      })

    if(isLoading){
        return <p>Loading.....</p>
    }
    if(isError){
      return <p>Error.....</p>
    }
    return <DataTable columns={columns} data={data} page={page} setPage={setPage} />
}