import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { QueryKey } from "../api";
import { FormikTextField } from "../ui/form";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateDistrictType, createDistrict, createUpdateDistrictSchema, districtCreateRes, initialValues, updateDistrict } from "./form.config";

interface IRowData{
  _id?: string;
  district_name?: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function DistrictCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();
  
  const {mutate} = useMutation(
    id ? updateDistrict :
    createDistrict, 
    {
      onSuccess: (data: districtCreateRes) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllDistrict]);
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
      onError: (error: districtCreateRes) => {
        toast({
          title: error?.message,
          color: "success",
          className: "bg-red-500 text-white"
        })
      },
    }
  );

    const onSubmit = async (data: CreateUpdateDistrictType) => await mutate(data);
    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} District</h3>
      <Formik 
        initialValues={id? {
          id: rowData?._id,
          district_name: rowData?.district_name
        } as CreateUpdateDistrictType : initialValues}
        validationSchema={createUpdateDistrictSchema}
        onSubmit={onSubmit}
      >
        {()=>
        <Form className="flex gap-3 flex-col">
            <div>
              <FormikTextField
                name="district_name"
                props={{
                  label: "District Name",
                  placeholder:"District Name"
                }}
              />
            </div>
            <FormikSubmitButton className="mt-3">Submit</FormikSubmitButton>
          </Form>
        }
      </Formik>
    </Modal>
)}