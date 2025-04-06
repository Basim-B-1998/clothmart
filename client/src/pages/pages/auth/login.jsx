import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "sonner";




const initialState={
  email:'',
  password:'',
}

function AuthLogin(){
  const [formData,setFormData]=useState(initialState) 
  const dispatch=useDispatch()
  

  function onSubmit(event){
    event.preventDefault()

    dispatch(loginUser(formData)).then((data) => {

      console.log("API Response:", data);

      if (data?.payload?.success) {
        toast.success(data?.payload?.message); // Success message
      } else {
        toast.error(data?.payload?.message); // Error message
      }
    });
  }
  

  return(
<div className="mx-auto w-full max-w-md space-y-6">
  <div className="text-center">
    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign to your account</h1>
    <p className="mt-2">Dont have an account
      <Link className="font-medium ml-3  text-primary hover:underline" to='/auth/register'>Register</Link>
    </p>
  </div>
  <CommonForm
  formControls={loginFormControls}
  buttonText={"Sign In"}
  formData={formData}
  setFormData={setFormData}
  onSubmit={onSubmit}
  />
</div>
  )
}


export default AuthLogin


