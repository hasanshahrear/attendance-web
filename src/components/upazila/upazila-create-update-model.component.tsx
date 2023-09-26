
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { QueryKey } from "../api";
import { useGetAllDistrictList } from "../hooks/useGetAllDistrictList";
import { FormikTextField } from "../ui/form";
import { FormikReactSelect } from "../ui/form/formik-react-select.component";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateUnionType, createUpazila, createUpdateUnionSchema, districtCreateRes, initialValues, updateUpazila } from "./form.config";

interface IRowData{
  _id?: string;
  district_id?: {
    _id?: string;
  };
  sub_district_name?: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function UpazilaCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();

  console.log({rowData})
  
  const {data: dataGetAllDistrict, isLoading: isLoadingGetAllDistrict} = useGetAllDistrictList()

  const {mutate} = useMutation(
    id ? updateUpazila :
    createUpazila, 
    {
      onSuccess: (data: districtCreateRes) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllUpazila]);
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

    const onSubmit = async (data: CreateUpdateUnionType) => await mutate(data);
    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} Upazila</h3>
      <Formik 
        initialValues={id ? {
          id: rowData?._id,
          district_id: rowData?.district_id?._id,
          sub_district_name: rowData?.sub_district_name
        } as CreateUpdateUnionType : initialValues}
        validationSchema={createUpdateUnionSchema}
        onSubmit={onSubmit}
      >
        {()=>
        <Form className="flex gap-3 flex-col">
            <div>
              <FormikReactSelect
                name="district_id" 
                label="District Name"
                placeholder="District Name"
                isLoading={isLoadingGetAllDistrict}
                options={dataGetAllDistrict?.data?.map((item)=> ({
                  value: item?._id,
                  label: item?.district_name
                }))}
                requiredIcon="*"
              />
            </div>
            <div>
              <FormikTextField
                name="sub_district_name"
                props={{
                  label: "Upazila Name",
                  placeholder:"Upazila Name",
                  requiredIcon:"*"
                }}
              />
            </div>
            <FormikSubmitButton className="mt-3">Submit</FormikSubmitButton>
          </Form>
        }
      </Formik>
    </Modal>
)}