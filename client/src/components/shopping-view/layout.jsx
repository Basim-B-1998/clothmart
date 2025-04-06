import { Outlet } from "react-router-dom"
import ShoppingHeader from "./header"; 

function ShoppingLayout(){
  return (
    <div className="flex flex-col bg-white w-screen min-w-full overflow-hidden">
      {/* common header */}
      <ShoppingHeader/>
      <main className="flex flex-col w-full min-w-full">
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout