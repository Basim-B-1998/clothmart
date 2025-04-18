import { House, LogOut, Menu ,ShoppingCart, User} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { logoutUser } from "@/store/auth-slice"
import UserCartWrapper from "./cart-wrapper"
import { useEffect, useState } from "react" 
import { fetchCartItems } from "@/store/shop/cart-slice"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

function MenuItems(){

  const navigate=useNavigate()

  function handleNavigate(getcurrentMenuItem){
    sessionStorage.removeItem('filters')
    const currentFilter = getcurrentMenuItem.id !== 'home' ? 
    {
      category : [getcurrentMenuItem.id]
  }  : null
  sessionStorage.setItem('filters',JSON.stringify(currentFilter))
  navigate(getcurrentMenuItem.path)
}

  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(menuItem=> 
      <Label onClick={()=> handleNavigate(menuItem)} className="text-sm font-medium cursor-pointer" key={menuItem.id} >{menuItem.label}</Label>)
    }
  </nav>
}

function HeaderRightContent(){
  const {user}=useSelector(state=>state.auth)
  const {cartItems} = useSelector(state=>state.shopCart)
  const [openCartSheet , setOpenCartSheet] = useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  function handleLogout(){
      dispatch(logoutUser())
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
    <Button 
      onClick={()=>setOpenCartSheet(true)}
       variant="outline" 
       size="icon"
    >
     <ShoppingCart className="w-6 h-6"/> 
     <span className="sr-only">User cart</span>
    </Button> 
    <UserCartWrapper 
    setOpenCartSheet={setOpenCartSheet}
    cartItems={cartItems  && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}/>
    </Sheet>
     
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