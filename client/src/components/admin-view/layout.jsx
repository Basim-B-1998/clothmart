import AdminHeader from "./header"
import AdminSideBar from "./sidebar"
import { Outlet } from "react-router-dom";

function AdminLayout(){
  return(
<div className="flex min-h-screen w-full">
    {/* admin sidebar */}
    <AdminSideBar/>

  <div className="flex flex-1 flex-col">
    {/* admin header */}
    <AdminHeader/>

    <main className="flex-1 bg-white p-4 md:p-6 w-full min-h-screen">
    <Outlet />
    </main>

  </div>
</div>
  )
}


export default AdminLayout