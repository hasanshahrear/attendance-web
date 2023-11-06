import { Api } from "../api"
import { ApiClient } from "../api/client"

export const getData = async () => {
    const res = await ApiClient.get(Api.Reports)
    return res?.data
  }