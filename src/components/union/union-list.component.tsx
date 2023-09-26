'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { QueryKey } from "../api"
import { Api } from "../api/endpoints"
import { ContentLayout } from "../layout"
import { Button } from "../ui/button"
import { CustomDataTable, TableAction } from "../ui/data-table"
import { Modal } from "../ui/modal"
import { toast } from "../ui/use-toast"
import { deleteUnion } from "./form.config"
import { UnionCreateUpdate } from "./upazila-create-update-model.component"

export function UnionList() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [deleteId, setDeletedId] = useState<number | string>("")

  const [id, setId] = useState<number>(0)
  const [rowData, setRowData] = useState<object>({})
  const queryClient = useQueryClient();

  const {mutate: mutateDelete, isLoading: isLoadingDelete} = useMutation(
    deleteUnion, 
    {
      onSuccess: (data: any) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllUnion]);
          setIsDelete(false)
          toast({
            title: data?.message,
            className: "bg-purple-800 text-white"
          })
        }
        if(data.status === "error"){
          setIsDelete(false)
          toast({
            title: data?.message,
            color: "success",
            className: "bg-red-500 text-white"
          })
        }
      },
      onError: (error: any) => {
        setIsDelete(false)
        toast({
          title: error?.message,
          color: "success",
          className: "bg-red-500 text-white"
        })
      },
    }
  );
  const handleDelete = () =>{
    setIsDelete(true)
  }
        
  return (
    <ContentLayout title="Union List" onClick={()=> {setIsOpen(true); setId(0);}} >
      <CustomDataTable 
        url={Api.GetAllUnion}
        queryKey={QueryKey.GetAllUnion}
        columns={[
          {
            accessorKey: "union_name",
            header: "Union Name",
          },
          {
            accessorKey: "sub_district_id",
            header: "Upazila Name",
            cell: ({row})=> {
              return <p>{row?.original?.sub_district_id?.sub_district_name}</p>
            }
          },
          {
            accessorKey: "district_id",
            header: "District Name",
            cell: ({row})=> {
              return <p>{row?.original?.district_id?.district_name}</p>
            }
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
          },
          {
            accessorKey: "updatedAt",
            header: "Updated At",
          },
          {
            accessorKey: "_id",
            id: "1",
            header: () => ( <div style={{  textAlign:"center" }}>Actions</div>),
            cell: ({row}) => {
              return <TableAction  
                handleEdit={ ()=> {setId(row?.original?._id); setIsOpen(true); setRowData(row?.original)} }
                handleDelete={()=> {handleDelete(); setDeletedId(row?.original?._id)}}
              />
            }
          },
        ]} 
      />
      <UnionCreateUpdate isOpen={isOpen} setIsOpen={setIsOpen} id={id} rowData={rowData} />
      <Modal isOpen={isDelete} setIsOpen={setIsDelete}  >
        <h3 className="text-2xl font-bold mb-2">Are you sure?</h3>
        <p>Do you want to delete the union?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={()=> setIsDelete(false)}>Cancel</Button>
          <Button className=" bg-red-600 hover:bg-red-500" onClick={()=> mutateDelete(deleteId)}>Delete</Button>
        </div>
      </Modal>
    </ContentLayout>
  )
}
