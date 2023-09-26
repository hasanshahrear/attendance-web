export const ApiPrefix = "/api";
export enum Api {
  // Common service
  DistrictDropdown = `${ApiPrefix}/district/dropdown`,
  UpazilaDropdown = `${ApiPrefix}/sub-district/get-sub-district-by-district`,
  UnionDropdown = `${ApiPrefix}/union/get-union-by-sub-district`,
  DesignationDropdown = `${ApiPrefix}/designation/designation-dropdown`,

  // Auth
  Login = `${ApiPrefix}/admin-login`,

  // District
  GetAllDistrict = `${ApiPrefix}/district/get-all/`,
  CreateDistrict = `${ApiPrefix}/district/`,

  // Upazila
  GetAllUpazila = `${ApiPrefix}/sub-district/get-all/`,
  CreateUpazila = `${ApiPrefix}/sub-district/`,
  
  // Union
  GetAllUnion = `${ApiPrefix}/union/get-all/`,
  CreateUnion = `${ApiPrefix}/union/`,

  // Designation
  GetAllDesignation = `${ApiPrefix}/designation/get-all/`,
  CreateDesignation = `${ApiPrefix}/designation/`,

  // Employee
  GetAllEmployee = `${ApiPrefix}/employees/get-all/`,
  CreateEmployee = `${ApiPrefix}/employees/`,

  // Holiday
  GetAllHoliday = `${ApiPrefix}/holidays/get-all`,
  CreateHoliday = `${ApiPrefix}/holidays/`,
}