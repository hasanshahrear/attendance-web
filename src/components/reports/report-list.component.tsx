import { useQuery } from "@tanstack/react-query"
import { getData } from "./config"

export function Reports(){

    const {data, isLoading, isError} = useQuery({
        queryKey: ["all-report"],
        queryFn:() => getData(),
    })

    return (
        <div className="px-5 lg:px-10 gap-10 flex flex-col mb-10">
            {
               data && data?.data?.length > 0 ? data?.data?.map((union: any, i : any) => {
                return ( 
                    <div className="bg-white rounded-lg shadow-[1px_3px_15px_rgba(0,0,0,0.15)]" key={i}>
                        <p key={i} className="p-5 pb-0 text-xl font-bold text-[#0d3b54]">Upazila: {union?._id?.sub_district_name}</p>
                        {
                            union?.unions?.map((upazila: any, j: any)=>{
                                return (
                                    <div className=" border bg-[#f9f9f9] p-5 m-5 rounded" key={j}>
                                        <p key={j} className="pb-5 text-lg font-bold text-[#ee9836]">Union: {upazila?.union?.union_name}</p>
                                        <table className="w-full border-collapse border border-slate-400">
                                            <thead className=" bg-[#0b2838] text-white">
                                                <tr>
                                                    <th className="text-left p-4 border border-slate-400 font-medium">Employee Name</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium">Phone Number</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium">Designation</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium">Check In</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium">Check Out</th>
                                                    <th className="text-center p-4 border border-slate-400 font-medium">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody> 
                                                {
                                                    upazila?.data?.map((info: any, k: any) => {
                                                        return(
                                                            <tr key={k} className=" p-5">
                                                                <td className="text-left p-4 border border-slate-400">{info?.user?.first_name + " " + info?.user?.last_name}</td>
                                                                <td className="text-center p-4 border border-slate-400">{info?.user?.phone}</td>
                                                                <td className="text-center p-4 border border-slate-400">{info?.designation?.designation_name}</td>
                                                                <td className="text-center p-4 border border-slate-400">
                                                                    <p>
                                                                       {
                                                                           info?.check_in[0]?.time ?? "No Check out"
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Distance: {
                                                                            info?.check_in[0]?.distance
                                                                        } M
                                                                    </p>
                                                                </td>
                                                                <td className="text-center p-4 border border-slate-400">
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
                                                                </td>
                                                                <td className="text-center p-4 border border-slate-400">
                                                                    {info?.remarks === "Present" ? (<p className="py-0.5  bg-green-500 rounded-3xl">Present</p>) : info?.remarks === "Absent" ? (<p className="py-0.5  bg-red-500 rounded-3xl">Present</p>) : (<p className="py-0.5  bg-gray-500 rounded-3xl">Leave</p>)}
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
                )
               }) 
               : <p>Not Data Found</p>
            }
        </div>
    )
}