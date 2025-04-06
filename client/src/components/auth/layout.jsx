import { Outlet } from "react-router-dom"
import AdminSideBar from "../admin-view/sidebar"
import { useState } from "react";
import Adminheader from "../admin-view/header"; 



function AuthLayout(){

  const [openSidebar,setOpenSidebar]=useState(false)

  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
      <div className="flex flex-1 flex-col">
      {/* admin header */}
        <Adminheader  setOpen={setOpenSidebar}/>
      <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
        <Outlet/>
      </main>
      </div>
    </div>
  )
}


export default AuthLayout