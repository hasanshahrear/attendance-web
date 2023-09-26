import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction } from "react";
import { QueryKey } from "../api";
import { FormikDateField, FormikTextField } from "../ui/form";
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component";
import { Modal } from '../ui/modal';
import { toast } from "../ui/use-toast";
import { CreateUpdateHolidayType, IHolidayCreateRes, createHoliday, createUpdateHolidaySchema, initialValues, updateHoliday } from "./form.config";
 
interface IRowData{
  _id?: string;
  holyDay: string;
  remarks: string;
}

interface IProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
    id: number | string;
    rowData?: IRowData;
}

export function HolidayCreateUpdate({isOpen,setIsOpen, id, rowData}: IProps) {
  const queryClient = useQueryClient();
  
  const {mutate} = useMutation(
    id ? updateHoliday :
    createHoliday, 
    {
      onSuccess: (data: IHolidayCreateRes) => {
        if(data.status === "success"){
          queryClient.invalidateQueries([QueryKey.GetAllHolidays]);
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
      onError: (error: IHolidayCreateRes) => {
        toast({
          title: error?.message,
          color: "success",
          className: "bg-red-500 text-white"
        })
      },
    }
  );

    const onSubmit = async (values: CreateUpdateHolidayType) => await mutate(values);
    const dateTime = DateTime.fromISO(rowData?.holyDay, { zone: 'utc' });
    const formattedDate = dateTime.toFormat("EEE MMM dd yyyy");

    return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
      <h3 className="leading-6 font-semibold mb-6">{id? "Update": "Create"} Holiday</h3>
      <Formik 
        initialValues={ id ? {
          id: rowData?._id,
          holyDay:  formattedDate ,
          remarks: rowData?.remarks,
        } as CreateUpdateHolidayType : initialValues}
        validationSchema={createUpdateHolidaySchema}
        onSubmit={onSubmit}
      >
        {()=>
          <Form className="flex gap-3 flex-col">
            <div className="flex flex-col gap-4">
              <div>
                <FormikDateField
                  name="holyDay"
                  props={{
                    label: "Holiday",
                    placeholder:"Holiday",
                    requiredIcon: "*"
                  }}
                />
              </div>
              <div>
                <FormikTextField
                  name="remarks"
                  props={{
                    label: "Remarks",
                    placeholder: "Enter Remarks",
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