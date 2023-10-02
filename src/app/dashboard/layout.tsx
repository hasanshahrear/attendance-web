'use client'
import Link from 'next/link';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <div className="main flex min-h-screen">
      <Sidebar className="sidebar w-[260px] min-h-screen bg-[#464646]">
        <h1 className='text-[56px] text-center py-10'>Logo</h1>
        <Menu>
          <MenuItem component={<Link href="/dashboard" />}> Dashboard </MenuItem>
          <MenuItem component={<Link href="/dashboard/district" />} > District </MenuItem>
          <MenuItem component={<Link href="/dashboard/upazila" />} > Upazila </MenuItem>
          <MenuItem component={<Link href="/dashboard/union" />} > Union </MenuItem>
          <MenuItem component={<Link href="/dashboard/designation" />} > Designation </MenuItem>
          <MenuItem component={<Link href="/dashboard/employee" />} > Employee </MenuItem>
          <MenuItem component={<Link href="/dashboard/holiday" />} > Holiday </MenuItem>
        </Menu>
      </Sidebar>
      <div className="content w-[calc(100%-260px)] h-full">
        <div className=" h-20 bg-white-500 w-full shadow-lg mb-10">

        </div>
        <div>
        {children}
        </div>
      </div>
    </div>
  )
}
