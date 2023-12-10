"use client"
import { useQuery } from "@tanstack/react-query"
import { Form, Formik } from "formik"
import jsPDF from 'jspdf'
import { useRef, useState } from "react"
import { FaDownload } from "react-icons/fa6"
import { useReactToPrint } from "react-to-print"
import { useGetAllDistrictList } from "../hooks/useGetAllDistrictList"
import { useGetAllUnionByUpazila } from "../hooks/useGetAllUnionByUpazila"
import { useGetAllUpazilaByDistrict } from "../hooks/useGetAllUpazilaByDistrict"
import { Button } from "../ui/button"
import { FormikDateField, FormikResetButton } from "../ui/form"
import { FormikReactSelect } from "../ui/form/formik-react-select.component"
import { FormikSubmitButton } from "../ui/form/formik-submit-button.component"
import { getData } from "./config"

const remarksData = [
    {
        value: "present",
        label: "Present",
    },
    {
        value: "absent",
        label: "Absent",
    },
    {
        value: "leave",
        label: "Leave",
    }
]

export function Reports(){

    const [districtId, setDistrictId] = useState<string>("")
    const [upazila, setUpazila] = useState<string>("")
    const [queryParams, setQueryParams] = useState<object>({})
    
    const {data: dataGetAllDistrict, isLoading: isLoadingGetAllDistrict} = useGetAllDistrictList()
    const {data: dataGetAllUpazila, isLoading: isLoadingGetAllUpazila} = useGetAllUpazilaByDistrict({id: districtId})
    const {data: dataGetAllUnion, isLoading: isLoadingGetAllUnion} = useGetAllUnionByUpazila({id: upazila})
  
  
  console.log({queryParams})

    const {data, isLoading, isError} = useQuery({
        queryKey: ["all-report", queryParams],
        queryFn:() => getData(queryParams),
    })
    const onSubmit = async (value: any) =>  {
        console.log({value})
        setQueryParams(value as any)
        return ;
    }

    

    const conponentPDF: any = useRef();

    const generatePDF = () => {
        // Create a new jsPDF instance
        const pdf = new jsPDF('p', 'pt', 'a4', true);
    
        // Function to add content of each page to the PDF
        const addContentToPDF = (pageNumber:number) => {
          const content = conponentPDF.current;
    
          // Set the page number
          if (pageNumber > 1) {
            pdf.addPage();
          }
    
          // Calculate y-position for new page content
          let yPosition = 0;
          if (pageNumber > 1) {
            yPosition = -pageNumber * content.clientHeight;
          }
    
          // Add content of the current page to the PDF
          pdf.html(content, {
            x: 40,
            y: yPosition,
            callback: () => {
              // Check if there are more pages to add
              if (pageNumber < totalPages) {
                addContentToPDF(pageNumber + 1); // Add next page content
              } else {
                // Save the PDF and display alert after all pages are added
                // pdf.save('Userdata.pdf');
                // alert('Data saved in PDF');
                
              }
            },
          });
        };
    
        // Get total number of pages
        const totalPages = Math.ceil(conponentPDF.current.clientHeight / pdf.internal.pageSize.getHeight());
    
        // Start adding content to the PDF from the first page
        addContentToPDF(1);
      };
    
      // Function to handle printing and generating PDF
      const downloadPDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: 'Userdata',
        // onAfterPrint: generatePDF, // Trigger PDF generation after printing
      });


      console.log(data?.data[0]?.unions[0]?.data[0]?.date)
  
    return (
        <div className="px-5 lg:px-10 gap-10 flex flex-col mb-10">
            <div>
                <Formik
                    initialValues={{}}
                    onSubmit={onSubmit}
                >
                    {({setFieldValue, values}) => {
                       return <Form className="flex gap-3 items-end">
                        <FormikDateField
                            name="date"
                            props={{
                                label:"Date",
                            }}
                        />
                        <FormikReactSelect
                            name="remarks" 
                            label="Remarks"
                            options={remarksData}
                        />
                        
                        <FormikReactSelect
                            name="district" 
                            label="District"
                            isLoading={isLoadingGetAllDistrict}
                            options={dataGetAllDistrict?.data?.map((item)=> ({
                                value: item?._id,
                                label: item?.district_name
                            }))}
                            requiredIcon="*"
                            onSelect={(value:any)=>{
                                setDistrictId(value?.value as string)
                                setUpazila("");
                                setFieldValue("upazila", "")
                                setFieldValue("union", "")
                            }}
                        />
                    
                        <FormikReactSelect
                            name="upazila" 
                            label="Upazila"
                            isLoading={isLoadingGetAllUpazila}
                            options={dataGetAllUpazila?.data?.map((item)=> ({
                                value: item?._id,
                                label: item?.sub_district_name
                            }))}
                            requiredIcon="*"
                            onSelect={(value:any)=>{
                                setUpazila(value?.value as string)
                                setFieldValue("union", "")
                            }}
                        />
                        <FormikReactSelect
                            name="union" 
                            label="Union"
                            isLoading={isLoadingGetAllUnion}
                            options={dataGetAllUnion?.data?.map((item)=> ({
                                value: item?._id,
                                label: item?.union_name
                            }))}
                            requiredIcon="*"
                        />
                            
                        <FormikSubmitButton >Filter</FormikSubmitButton>
                        <FormikResetButton>Reset</FormikResetButton>
                        <Button  onClick={downloadPDF} className="bg-blue-600" > <FaDownload className="mr-2" /> PDF </Button>
                        
                    </Form>
                    }}
              </Formik>
            </div>
            <div ref={conponentPDF}>
            {
                data?.data[0]?.unions[0]?.data[0]?.date && (
                    <div className="bg-[#0b2838] p-4 rounded-lg mb-2 print:p-2 print:m-4 print:rounded-none print:bg-black">
                        <p className="text-white text-xl font-bold">Date: {data?.data[0]?.unions[0]?.data[0]?.date}</p>
                    </div>
                )
            }
            
            {
               data && data?.data?.length > 0 ? data?.data?.map((union: any, i : any) => {
                return ( 
                    <div  className="bg-white rounded-lg shadow-[1px_3px_15px_rgba(0,0,0,0.15)] print:shadow-none" key={i}>
                        <div key={i}>
                        <p  className="p-5 pb-0 text-xl font-bold text-[#0d3b54] print:text-black print:text-lg">Upazila: {union?._id?.sub_district_name}</p>
                        {
                            union?.unions?.map((upazila: any, j: any)=>{
                                return (
                                    <div className=" border bg-[#f9f9f9] p-5 m-5 rounded print:p-0 print:bg-white" key={j}>
                                        <p key={j} className="pb-5 text-lg font-bold text-[#ee9836] print:text-black print:border print:border-b print:pb-0 print:mb-4" >Union: {upazila?.union?.union_name}</p>
                                        <table className="w-full border-collapse border border-slate-400">
                                            <thead className=" bg-[#0b2838] text-white print:bg-black">
                                                <tr>
                                                    <th className="text-left p-4 border border-slate-400 font-medium print:py-1">Name</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium print:py-1">Phone</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium print:py-1">Designation</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium print:py-1 print:w-28"> In</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium print:py-1 print:w-28"> Out</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium print:py-1">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                {
                                                    upazila?.data?.map((info: any, k: any) => {
                                                        return(
                                                            <tr key={k} className=" p-5 print:p-0">
                                                                <td className="text-left p-4 border border-slate-400 print:p-2 print:text-xs">{info?.user?.first_name + " " + info?.user?.last_name}</td>
                                                                <td className="text-center p-4 border border-slate-400 print:p-2 print:text-xs">{info?.user?.phone}</td>
                                                                <td className="text-center p-4 border border-slate-400 print:p-2 print:text-xs">{info?.designation?.designation_name}</td>
                                                                <td className="text-center p-4 border border-slate-400 print:p-2 print:text-xs">
                                                                    {
                                                                        info?.remarks === "Present" ? (
                                                                            <>
                                                                                <p>
                                                                                    {
                                                                                    info?.check_in[0]?.time ?? "No Check In"
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    Dis: {
                                                                                        info?.check_in[0]?.distance
                                                                                    } M
                                                                                </p>
                                                                            </>
                                                                        ) : "---"
                                                                    }
                                                                </td>
                                                                <td className="text-center p-4 border border-slate-400 print:p-2 print:text-xs">
                                                                    {
                                                                        info?.remarks === "Present" ? (
                                                                           <>
                                                                                <p>
                                                                                    {
                                                                                        info?.check_out[Number(info?.check_out?.length) - 1 ]?.time ?? "No Check out"
                                                                                    }
                                                                                </p>
                                                                                <p>
                                                                                    Distance: {
                                                                                        info?.check_out[Number(info?.check_out?.length) - 1 ]?.distance
                                                                                    } M
                                                                                </p>
                                                                            </>
                                                                        ) : "---"
                                                                    }
                                                                    
                                                                </td>
                                                                <td className="text-center p-4 border border-slate-400 print:p-2 print:text-xs">
                                                                    {info?.remarks === "Present" ? (<p className="py-0.5  bg-green-500 rounded-3xl print:bg-transparent">Present</p>) : info?.remarks === "Absent" ? (<p className="py-0.5  bg-red-500 rounded-3xl print:bg-transparent">Absent</p>) : (<p className="py-0.5  bg-gray-500 rounded-3xl print:bg-transparent">{info?.remarks}</p>)}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>  
                                        </table>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                )
               }) 
               : <p>Not Data Found</p>
            }
            </div>
        </div>
    )
}