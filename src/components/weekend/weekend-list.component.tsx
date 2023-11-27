'use client'

import { QueryKey } from "@/components/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { createHoliday, weekendList } from "./form.config";

export function WeekendList() {
  const queryClient = useQueryClient();
  
 const {data, isLoading} = useQuery({
  queryKey : [QueryKey.GetAllWeekend],
  queryFn: weekendList
 })

 const {mutate} = useMutation({
  mutationFn: createHoliday,
  onSuccess: ()=> {
    queryClient.invalidateQueries([QueryKey.GetAllDistrict]);
    toast({
      title: data?.message,
      className: "bg-purple-800 text-white"
    })
  }
 })

 if(isLoading) {
  return <p>Loading...</p>
 }
        
  return (
   
      <div className="px-5 lg:px-10">
        
      <h2 className=" text-xl lg:text-4xl font-bold mb-4">Weekend List</h2>
      {
        data?.data?.length > 0 ? <>
        {
          data?.data?.map((item: any, index: any) => {
            return <p key={index}> <input type="checkbox" defaultChecked={item?.isHoliday} onClick={()=> mutate({id: item?._id})} />  {item?.day}</p>
          })
        }</> : "No data available"
      }</div>
     
  )
}
