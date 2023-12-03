import { Api } from "../api";
import { ApiClient } from "../api/client";

type TQuery = {
  district?: string,
  upazila?: string,
  union?: string,
  remarks?: string,
  fromDate?: Date,
  toDate?: Date,
}
export const getData = async (queryParams: TQuery) => {

  const { remarks, district, upazila, union, fromDate, toDate } = queryParams;
  console.log({fromDate})
  console.log({toDate})


   // Create an array to hold valid query parameters
  const validParams = [];

  // Check if each parameter has a valid value and add it to validParams array
  if (remarks) validParams.push(`remarks=${remarks}`);
  if (district) validParams.push(`district=${district}`);
  if (upazila) validParams.push(`upazila=${upazila}`);
  if (union) validParams.push(`union=${union}`);
  if (fromDate) {
    const formattedDate = new Date(fromDate).toLocaleDateString();
    validParams.push(`fromDate=${formattedDate}`);
  }
  if (toDate) {
    const formattedDate = new Date(toDate).toLocaleDateString();
    validParams.push(`toDate=${formattedDate}`);
  }

  // Construct the URL with valid query parameters
  const url = `${Api.MonthlyReports}${validParams.length > 0 ? `?${validParams.join('&')}` : ''}`;

    const res = await ApiClient.get(url)
    return res?.data
  }