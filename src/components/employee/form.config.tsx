import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateEmployeeSchema = yup.object({
  id: yup.string().nullable(),
  first_name: yup.string().label("First name").min(2).required(),
  last_name: yup.string().label("Last name").min(2).required(),
  phone: yup.string().label("Phone").min(11).max(11).required(),
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").min(6).required(),
  confirm_password: yup.string().label("Confirm password").min(6).required(),
  district: yup.string().label("District").required(),
  upazila: yup.string().label("Upazila").required(),
  union: yup.string().label("Union").required(),
  office_address: yup.string().label("Office address").min(2).required(),
  gender: yup.string().label("Gender").min(2).required(),
  designation: yup.string().label("Designation").required(),
})

export type CreateUpdateEmployeeType = yup.InferType<typeof createUpdateEmployeeSchema>

export const initialValues : CreateUpdateEmployeeType = {
    id: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    district: "",
    upazila: "",
    union: "",
    office_address: "",
    gender: "",
    designation: ""
}

export interface IEmployeeCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}


export const createEmployee = async (payload: CreateUpdateEmployeeType) => {
  const res = await ApiClient.post(Api.CreateEmployee, payload)
  return res?.data
}
export const updateEmployee = async (payload: CreateUpdateEmployeeType) => {
  const res = await ApiClient.put(Api.CreateEmployee+payload.id, payload)
  return res?.data
}

export const deleteEmployee = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateEmployee + id)
  return res?.data
}