import { House, LogOut, Menu ,ShoppingCart, User} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { logoutUser } from "@/store/auth-slice"
 

function MenuItems(){
  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(menuItem=> 
      <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
    }
  </nav>
}

function HeaderRightContent(){
  const {user}=useSelector(state=>state.auth)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  function handleLogout(){
      dispatch(logoutUser())
  }

  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
     <button variant="outline" size="icon">
     <ShoppingCart className="w-6 h-6"/> 
     <span className="sr-only">User cart</span>
    </button> 
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="bg-black">
        <AvatarFallback className="bg-black text-white font-extrabold">
          {user?.userName[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" className="w-56">
      <DropdownMenuLabel>
        Logged in as {user?.userName}
      </DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
      <User className="mr-2 h-4 w-4" />
      Account
      </DropdownMenuItem>
      
      <DropdownMenuSeparator/>
      <DropdownMenuItem onClick={handleLogout}>
       <LogOut className="mr-2 h-4 w-4"/>
       Logout
      </DropdownMenuItem>
       
    </DropdownMenuContent>
  </DropdownMenu>

  </div>
}



function ShoppingHeader(){

  const {isAuthenticated}=useSelector(state=>state.auth)
  

  return (
    <header className="fixed top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link to='/shop/home' className="flex items-center gap-2">
      <House className="h-6 w-6"/>
      <span className="font-bold">Ecommerce</span>
      </Link>
      <Sheet>
     
        <SheetTrigger asChild>
          <button variant="outline" size="icon" className="lg:hidden absolute right-4 top-4">
          <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle header menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-xs pt-16 pl-5">
          <MenuItems/>
          <HeaderRightContent/>
        </SheetContent>
  
      </Sheet>
      <div className="hidden lg:block">
       <MenuItems/>
      </div>

       
           <div className="hidden lg:block">
            <HeaderRightContent/>
          </div> 
        

      </div>

    </header>
  )
}

export default ShoppingHeader