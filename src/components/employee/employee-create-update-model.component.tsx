import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QueryKey } from "../api";
import { useGetAllDesignationList } from "../hooks/useGetAllDesignation";
import { useGetAllDistrictList } from "../hooks/useGetAllDistrictList";
import { useGetAllUnionByUpazila } from "../hooks/useGetAllUnionByUpazila";
import { useGetAllUpazilaByDistrict } from "../hooks/useGetAllUpazilaByDistrict";
import { FormikTextField } from "../ui/form";
import { FormikReactSelect } from "../ui/form/formik-react-select.component";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateEmployeeType, IEmployeeCreateRes, createEmployee, createUpdateEmployeeSchema, initialValues, updateEmployee } from "./form.config";

interface IRowData{
  _id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  designation: {
    _id: string;
  };
  district_id:{
    _id?: string;
  };
  upazila:{
    _id?: string;
  };
  union:{
    _id?: string;
  };
  office_location: string;
  gender: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function EmployeeCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();
  const [districtId, setDistrictId] = useState<string>("")
  const [upazila, setUpazila] = useState<string>("")
  // const [union, setUnion] = useState<string>("")
  
  const {data: dataGetAllDistrict, isLoading: isLoadingGetAllDistrict} = useGetAllDistrictList()
  const {data: dataGetAllUpazila, isLoading: isLoadingGetAllUpazila} = useGetAllUpazilaByDistrict({id: districtId})
  const {data: dataGetAllUnion, isLoading: isLoadingGetAllUnion} = useGetAllUnionByUpazila({id: upazila})
  const {data: dataGetAllDesignation, isLoading: isLoadingGetAllDesignation} = useGetAllDesignationList()


  useEffect(()=>{
    if(id){
      setDistrictId(rowData?.district_id?._id as string )
    }
  }, [id])

  useEffect(()=>{
    if(id){
      setUpazila(rowData?.upazila?._id as string )
    }
  }, [id])

  // useEffect(()=>{
  //   if(id){
  //     setUnion(rowData?.union?._id as string )
  //   }
  // }, [id])
  
  const {mutate} = useMutation(
    id ? updateEmployee :
    createEmployee, 
    {
      onSuccess: (data: IEmployeeCreateRes) => {
        console.log({data})
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllEmployee]);
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
      onError: (error: AxiosError) => {
        const data = error?.response?.data as IEmployeeCreateRes
        toast({
          title: data?.message,
          color: "success",
          className: "bg-red-500 text-white"
        })
      },
    }
  );

    const onSubmit = async (values: CreateUpdateEmployeeType) => await mutate(values);
    
    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} Employee</h3>
      <Formik 
        initialValues={id ? {
          id: rowData?._id,
          first_name: rowData?.first_name,
          last_name: rowData?.last_name,
          email: rowData?.email,
          phone: rowData?.phone,
          password: "",
          designation: rowData?.designation?._id,
          district: rowData?.district_id?._id,
          upazila: rowData?.upazila?._id,
          union: rowData?.union?._id,
          gender: rowData?.gender,
          office_address: rowData?.office_location,
        } as CreateUpdateEmployeeType : initialValues}
        validationSchema={createUpdateEmployeeSchema}
        onSubmit={onSubmit}
      >
        {()=>
          <Form className="flex gap-3 flex-col">
            <div className="flex gap-3">
              <div className="flex-1">
                <FormikTextField
                  name="first_name"
                  props={{
                    label: "First Name",
                    placeholder:"First Name"
                  }}
                />
              </div>
              <div className="flex-1">
                <FormikTextField
                  name="last_name"
                  props={{
                    label: "Last Name",
                    placeholder:"Last Name"
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <FormikTextField
                  name="phone"
                  props={{
                    label: "Phone",
                    placeholder:"Phone"
                  }}
                />
              </div>
              <div className="flex-1">
                <FormikReactSelect 
                  name="gender"
                  label="Gender"
                  placeholder="Gender"
                  options= {[{value: "male", label: "male"}, {value: "female", label: "female"}, {value: "other", label: "other"}]}
                />
              </div>
            </div>
           
            <div className="flex gap-2">
              <div className="flex-1">
                <FormikReactSelect
                  name="district" 
                  label="District"
                  isLoading={isLoadingGetAllDistrict}
                  options={dataGetAllDistrict?.data?.map((item)=> ({
                    value: item?._id,
                    label: item?.district_name
                  }))}
                  requiredIcon="*"
                  onSelect={(value)=>{
                    setDistrictId(value?.value as string)
                  }}
                />
              </div>
              <div className="flex-1">
                <FormikReactSelect
                  name="upazila" 
                  label="Upazila"
                  isLoading={isLoadingGetAllUpazila}
                  options={dataGetAllUpazila?.data?.map((item)=> ({
                    value: item?._id,
                    label: item?.sub_district_name
                  }))}
                  requiredIcon="*"
                  onSelect={(value)=>{
                    setUpazila(value?.value as string)
                  }}
                />
              </div>
              <div className="flex-1">
                <FormikReactSelect
                  name="union" 
                  label="Union"
                  isLoading={isLoadingGetAllUnion}
                  options={dataGetAllUnion?.data?.map((item)=> ({
                    value: item?._id,
                    label: item?.union_name
                  }))}
                  requiredIcon="*"
                />
              </div>
            </div>

            <div>
              <FormikTextField
                name="email"
                props={{
                  label: "Email",
                  placeholder:"Email"
                }}
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <FormikReactSelect
                  name="designation" 
                  label="Designation"
                  isLoading={isLoadingGetAllDesignation}
                  options={dataGetAllDesignation?.data?.map((item)=> ({
                    value: item?._id,
                    label: item?.designation_name
                  }))}
                  requiredIcon="*"
                />
              </div>
              <div className="flex-1">
                <FormikTextField
                  name="office_address"
                  props={{
                    label: "Office Address",
                    placeholder:"Office Address"
                  }}
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <FormikTextField
                  name="password"
                  props={{
                    label: "Password",
                    placeholder:"Password",
                    password: true
                  }}
                />
              </div>
              <div className="flex-1">
                <FormikTextField
                  name="confirm_password"
                  props={{
                    label: "Confirm Password",
                    placeholder:"Confirm Password",
                    password: true
                  }}
                />
              </div>
            </div>
            
            <FormikSubmitButton className="mt-3">Submit</FormikSubmitButton>
          </Form>
        }
      </Formik>
    </Modal>
)}