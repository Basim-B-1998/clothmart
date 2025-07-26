import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/shop/cart-slice"; // ✅ Adjust path if needed
import { CheckCircle } from "lucide-react"; // ✅ Success icon

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Clear cart when user lands here
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-white">
      <Card className="p-10 text-center max-w-xl w-full shadow-lg border-green-400 border rounded-2xl">
        <CardHeader className="flex flex-col items-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-600 animate-bounce" />
          <CardTitle className="text-4xl text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-4 text-gray-700 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </CardContent>

        <Button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          onClick={() => navigate("/shop/account")}
        >
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
