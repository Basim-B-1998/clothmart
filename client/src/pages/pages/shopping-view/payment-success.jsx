import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentsuccessPage() {

  const navigate=useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-700">
      <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
      <p className="text-lg mb-6">Thank you for your purchase!</p>
      <button className="mt-5" onClick={()=>navigate('/shop/account')}>View Orders</button>
    </div>
  );
}

export default PaymentsuccessPage;
