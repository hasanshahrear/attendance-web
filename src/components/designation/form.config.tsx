'use client'
import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateDesignationSchema = yup.object({
  id: yup.string().nullable(),
  designation_name: yup.string().label("Designation Name").min(2).required(),
})

export type CreateUpdateDesignationType = yup.InferType<typeof createUpdateDesignationSchema>

export const initialValues : CreateUpdateDesignationType = {
    id: null,
    designation_name: "",
}

export interface IDesignationCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}


export const createDesignation = async (payload: CreateUpdateDesignationType) => {
  const res = await ApiClient.post(Api.CreateDesignation, payload)
  return res?.data
}
export const updateDesignation = async (payload: CreateUpdateDesignationType) => {
  const res = await ApiClient.put(Api.CreateDesignation+payload.id, payload)
  return res?.data
}

export const deleteDesignation = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateDesignation+id)
  return res?.data
}