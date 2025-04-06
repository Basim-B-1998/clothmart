import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import AuthLayout from './components/auth/layout' 
import AuthLogin from './pages/pages/auth/login'
import AuthRegister from './pages/pages/auth/register'
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from './pages/pages/admin-view/dashboard'  
import AdminProducts from './pages/pages/admin-view/products';  
import AdminOrders from './pages/pages/admin-view/orders';  
import AdminFeatures from './pages/pages/admin-view/features';  
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './pages/pages/not-found'
import ShoppingHome from './pages/pages/shopping-view/home'
import ShoppingAccount from './pages/pages/shopping-view/account'
import ShoppingListing from './pages/pages/shopping-view/listing'
import ShoppingCheckout from './pages/pages/shopping-view/checkout'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/pages/unauth-page'
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"




function App() {
  const [count, setCount] = useState(0)


const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
const dispatch=useDispatch()

useEffect(()=>{
   dispatch(checkAuth())
},[dispatch])

if (isLoading)  return <Skeleton className="w-[600px] h-[600px]" />


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
    
    

<Routes>
  <Route path='/auth' element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AuthLayout/>
      </CheckAuth>}>
    <Route path='login' element={<AuthLogin/>}/>
    <Route path='register' element={<AuthRegister/>}/>
  </Route>
  <Route path="/admin" element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
      <AdminLayout/>
    </CheckAuth>}>
    <Route  path="dashboard" element={<AdminDashboard/>}/>
    <Route  path="products" element={<AdminProducts/>}/>
    <Route  path="orders" element={<AdminOrders/>}/>
    <Route  path="features" element={<AdminFeatures/>}/>                 
  </Route>
  <Route path="/shop" element={
    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
       <ShoppingLayout/>
    </CheckAuth>
  }>
    <Route path="home" element={<ShoppingHome/>}/>
    <Route path="account" element={<ShoppingAccount/>}/>
    <Route path="checkout" element={<ShoppingCheckout/>}/>
    <Route path="listing" element={<ShoppingListing/>}/>
</Route>
    <Route path="*" element={<NotFound/>}/> 
    <Route path="unauth-page" element={<UnauthPage/>}/>
</Routes>

    </div>

  
  )
}

export default App
