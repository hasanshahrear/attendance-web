'use client'
import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateHolidaySchema = yup.object({
  id: yup.string().nullable(),
  holyDay: yup.date().label("Date").required(),
  remarks: yup.string().required(),
})

export type CreateUpdateHolidayType = yup.InferType<typeof createUpdateHolidaySchema>

export const initialValues : CreateUpdateHolidayType = {
    id: null,
    holyDay: new Date(),
    remarks: ""
}

export interface IHolidayCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}


export const createHoliday = async (payload: CreateUpdateHolidayType) => {
  const res = await ApiClient.post(Api.CreateHoliday, payload)
  return res?.data
}
export const updateHoliday = async (payload: CreateUpdateHolidayType) => {
  const res = await ApiClient.put(Api.CreateHoliday+payload.id, payload)
  return res?.data
}

export const deleteHoliday = async (id: number | string) => {
  const res = await ApiClient.delete(Api.CreateHoliday+id)
  return res?.data
}