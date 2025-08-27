import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  function handleDemoLogin(role) {
    const demoCredentials = {
      user: {
        email: "demo_user@example.com",
        password: "user1234",
      },
      admin: {
        email: "demo_admin@example.com",
        password: "admin1234",
      },
    };

    const creds = demoCredentials[role];

    dispatch(loginUser(creds)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: `Logged in as ${role}` });
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>

      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

      {/* Demo login buttons */}
      <div className="space-y-2">
        <button
          onClick={() => handleDemoLogin("user")}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login as Demo User
        </button>
        <button
          onClick={() => handleDemoLogin("admin")}
          className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Login as Demo Admin
        </button>
      </div>
    </div>
  );
}

export default AuthLogin;
