import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateDistrictSchema = yup.object({
  id: yup.string().nullable(),
  district_name: yup.string().label("District Name").min(2).required(),
})

export type CreateUpdateDistrictType = yup.InferType<typeof createUpdateDistrictSchema>

export const initialValues : CreateUpdateDistrictType = {
    id: null,
    district_name: "",
}

export interface districtCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}


export const createDistrict = async (payload: CreateUpdateDistrictType) => {
  const res = await ApiClient.post(Api.CreateDistrict, payload)
  return res?.data
}
export const updateDistrict = async (payload: CreateUpdateDistrictType) => {
  const res = await ApiClient.put(Api.CreateDistrict+ `?id=${payload.id}`, payload)
  return res?.data
}

export const deleteDistrict = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateDistrict+ `?id=${id}`)
  return res?.data
}