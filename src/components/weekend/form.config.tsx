'use client'
import * as yup from "yup"
import { ApiClient } from "../api/client"
import { Api } from "../api/endpoints"

export const createUpdateHolidaySchema = yup.object({
  id: yup.string().nullable(),
})

export type CreateUpdateHolidayType = yup.InferType<typeof createUpdateHolidaySchema>

export const initialValues : CreateUpdateHolidayType = {
    id: null,
}

export interface IHolidayCreateRes {
  status: string,
  statusCode: number,
  message: string,
  data: null
}

export const weekendList = async () => {
  const res = await ApiClient.get(Api.GetAllWeekend)
  return res?.data
}

export const createHoliday = async (payload: CreateUpdateHolidayType) => {
  const res = await ApiClient.post(Api.CreateWeekend, payload)
  return res?.data
}
