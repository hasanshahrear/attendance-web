"use client"

import { ApiClient } from "@/components/api/client"
import { Api } from "@/components/api/endpoints"
import * as yup from "yup"

export const loginFormSchema = yup.object({
  phone: yup.string().label("Phone").min(2).max(11).required(),
  password: yup.string().min(6).required(),
})

export type LoginFormType = yup.InferType<typeof loginFormSchema>

export const initialValues = {
    phone: "",
    password: "",
}

export const loginMethod = async (loginInfo: LoginFormType) => {
  const res = await ApiClient.post(Api.Login, loginInfo)
  return res?.data
}