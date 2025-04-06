import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";


function AdminHeader({setOpen}){ 

  const dispatch = useDispatch()

  function handleLogout(){
      dispatch(logoutUser())
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
      <AlignJustify />      {/* taken from https://lucide.dev/icons/ */}
      <span className="sr-only">Toggle Menu</span>  
      </button>
      <div className="flex flex-1 justify-end">
      <button onClick={handleLogout} className="absolute top-3 right-4 inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">  
        <LogOut />           {/* taken from https://lucide.dev/icons/ */}
          Logout
          </button>
      </div>
    </header>
  )
}

export default AdminHeader