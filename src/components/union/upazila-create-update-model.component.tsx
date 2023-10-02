
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QueryKey } from "../api";
import { useGetAllDistrictList } from "../hooks/useGetAllDistrictList";
import { useGetAllUpazilaByDistrict } from "../hooks/useGetAllUpazilaByDistrict";
import { FormikTextField } from "../ui/form";
import { FormikReactSelect } from "../ui/form/formik-react-select.component";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateUnionType, createUnion, createUpdateUnionSchema, districtCreateRes, initialValues, updateUnion } from "./form.config";

interface IRowData{
  _id?: string;
  district_id?: {
    _id?: string;
  };
  sub_district_id?:{_id: string};
  union_name?: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function UnionCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();
  const [districtId, setDistrictId] = useState<string>("")
  
  const {data: dataGetAllDistrict, isLoading: isLoadingGetAllDistrict} = useGetAllDistrictList()
  const {data: dataGetAllUpazila, isLoading: isLoadingGetAllUpazila} = useGetAllUpazilaByDistrict({id: districtId})

  useEffect(()=>{
    if(id){
      setDistrictId(rowData?.district_id?._id as string )
    }
  }, [id])
  
  const {mutate} = useMutation(
    id ? updateUnion :
    createUnion, 
    {
      onSuccess: (data: districtCreateRes) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllUnion]);
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

    const onSubmit = async (values: CreateUpdateUnionType) => await mutate(values);
    
    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} Upazila</h3>
      <Formik 
        initialValues={id ? {
          id: rowData?._id,
          district_id: rowData?.district_id?._id,
          sub_district_id: rowData?.sub_district_id?._id,
          union_name: rowData?.union_name
        } as CreateUpdateUnionType : initialValues}
        validationSchema={createUpdateUnionSchema}
        onSubmit={onSubmit}
      >
        {()=>
        <Form className="flex gap-3 flex-col">
            <div>
              <FormikReactSelect
                name="district_id" 
                label="Sub District Name"
                placeholder="Sub District Name"
                isLoading={isLoadingGetAllDistrict}
                options={dataGetAllDistrict?.data?.map((item)=> ({
                  value: item?._id,
                  label: item?.district_name
                }))}
                requiredIcon="*"
                onSelect={(value:any)=>{
                  setDistrictId(value?.value as string)
                }}
              />
            </div>
            <div>
              <FormikReactSelect
                name="sub_district_id" 
                label="Sub District Name"
                placeholder="Sub District Name"
                isLoading={isLoadingGetAllUpazila}
                options={dataGetAllUpazila?.data?.map((item)=> ({
                  value: item?._id,
                  label: item?.sub_district_name
                }))}
                requiredIcon="*"
              />
            </div>
            <div>
              <FormikTextField
                name="union_name"
                props={{
                  label: "Union Name",
                  placeholder:"Union Name",
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