'use client'

import { Api, QueryKey } from "@/components/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { ContentLayout } from "../layout"
import { Button } from "../ui/button"
import { CustomDataTable, TableAction } from "../ui/data-table"
import { Modal } from "../ui/modal"
import { toast } from "../ui/use-toast"
import { EmployeeCreateUpdate } from "./employee-create-update-model.component"
import { deleteEmployee } from "./form.config"

export function EmployeeList() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [deleteId, setDeletedId] = useState<number | string>("")

  const [id, setId] = useState<number>(0)
  const [rowData, setRowData] = useState<object>({})
  const queryClient = useQueryClient();

  const {mutate: mutateDelete, isLoading: isLoadingDelete} = useMutation(
    deleteEmployee, 
    {
      onSuccess: (data: any) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllEmployee]);
          toast({
            title: data?.message,
            className: "bg-purple-800 text-white"
          })
          setIsDelete(false)
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
    <ContentLayout title="Employee List" onClick={()=> {setIsOpen(true); setId(0);}} >
      <CustomDataTable 
        url={Api.GetAllEmployee}
        queryKey={QueryKey.GetAllEmployee}
        columns={[
          {
            accessorKey: "first_name",
            header: "Name",
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
                // handleEdit={ ()=> {setId(row?.original?._id); setIsOpen(true); setRowData(row?.original)} }
                handleDelete={()=> {handleDelete(); setDeletedId(row?.original?._id)}}
              />
            }
          },
        ]} 
      />
      <EmployeeCreateUpdate  isOpen={isOpen} setIsOpen={setIsOpen} id={id}  />
      <Modal isOpen={isDelete} setIsOpen={setIsDelete}  >
        <h3 className="text-2xl font-bold mb-2">Are you sure?</h3>
        <p>Do you want to delete the district?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={()=> setIsDelete(false)}>Cancel</Button>
          <Button className=" bg-red-600 hover:bg-red-500" onClick={()=> mutateDelete(deleteId)}>Delete</Button>
        </div>
      </Modal>
    </ContentLayout>
  )
}
