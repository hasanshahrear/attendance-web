import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateUnionSchema = yup.object({
  id: yup.string().nullable(),
  district_id: yup.string().label("District").required(),
  sub_district_name: yup.string().label("Upazila Name").min(2).required(),
})

export type CreateUpdateUnionType = yup.InferType<typeof createUpdateUnionSchema>

export const initialValues : CreateUpdateUnionType = {
    id: null,
    district_id: "",
    sub_district_name: "",
}

export interface districtCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}

export const createUpazila = async (payload: CreateUpdateUnionType) => {
  const res = await ApiClient.post(Api.CreateUpazila, payload)
  return res?.data
}

export const updateUpazila = async (payload: CreateUpdateUnionType) => {
  const res = await ApiClient.put(Api.CreateUpazila+ `?id=${payload.id}`, payload)
  return res?.data
}

export const deleteUpazila = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateUpazila+ `?id=${id}`)
  return res?.data
}