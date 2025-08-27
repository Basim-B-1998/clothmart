import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.jpg"

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-12">
        <div className="w-full max-w-md space-y-8 shadow-xl rounded-2xl border border-gray-200 p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

