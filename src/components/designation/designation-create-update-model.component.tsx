'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { QueryKey } from "../api";
import { FormikTextField } from "../ui/form";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateDesignationType, IDesignationCreateRes, createDesignation, createUpdateDesignationSchema, initialValues, updateDesignation } from "./form.config";

interface IRowData{
  _id?: string;
  designation_name?: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function DesignationCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();
  
  const {mutate} = useMutation(
    id ? updateDesignation :
    createDesignation, 
    {
      onSuccess: (data: IDesignationCreateRes) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllDesignation]);
          toast({
            title: data?.message,
            className: "bg-purple-800 text-white"
          })
          setIsOpen(false)
        }
        if(data.status === "error"){
          toast({
            title: data?.message,
            color: "success",
            className: "bg-red-500 text-white"
          })
        }
      },
      onError: (error: IDesignationCreateRes) => {
        toast({
          title: error?.message,
          color: "success",
          className: "bg-red-500 text-white"
        })
      },
    }
  );

    const onSubmit = async (values: CreateUpdateDesignationType) => await mutate(values);
    
    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} Designation</h3>
      <Formik 
        initialValues={id? {
          id: rowData?._id,
          designation_name: rowData?.designation_name
        } as CreateUpdateDesignationType : initialValues}
        validationSchema={createUpdateDesignationSchema}
        onSubmit={onSubmit}
      >
        {()=>
          <Form className="flex gap-3 flex-col">
            <div>
              <FormikTextField
                name="designation_name"
                props={{
                  label: "Designation Name",
                  placeholder:"Designation Name"
                }}
              />
            </div>
            <FormikSubmitButton className="mt-3">Submit</FormikSubmitButton>
          </Form>
        }
      </Formik>
    </Modal>
)}