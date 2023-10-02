'use client'

import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateUnionSchema = yup.object({
  id: yup.string().nullable(),
  district_id: yup.string().label("District").required(),
  sub_district_id: yup.string().label("Upazila Name").required(),
  union_name: yup.string().label("Upazila Name").min(2).required(),
})

export type CreateUpdateUnionType = yup.InferType<typeof createUpdateUnionSchema>

export const initialValues : CreateUpdateUnionType = {
    id: null,
    district_id: "",
    sub_district_id: "",
    union_name: ""
}

export interface districtCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}

export const createUnion = async (payload: CreateUpdateUnionType) => {
  const res = await ApiClient.post(Api.CreateUnion, payload)
  return res?.data
}

export const updateUnion = async (payload: CreateUpdateUnionType) => {
  const res = await ApiClient.put(Api.CreateUnion + `?id=${payload.id}`, payload)
  return res?.data
}

export const deleteUnion = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateUnion + `?id=${id}`)
  return res?.data
}