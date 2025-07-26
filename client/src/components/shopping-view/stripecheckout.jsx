import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux"; // ✅ if using Redux
import { clearCart } from "../../store/shop/cart-slice";



export default function StripeCheckout({ amount, address }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const selectedAddress = address;

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd" }),
      });
      const data = await res.json();

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("CardElement not found");

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "Test User",
            address: {
              postal_code: selectedAddress?.pincode || "00000",
            },
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("✅ Payment succeeded!");
        alert("Payment succeeded!");

        // ✅ Clear cart and redirect
        dispatch(clearCart()); // Redux way — OR use localStorage.clear() based on your setup
        navigate("/shop/payment-success");

      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: "16px",
            },
          },
        }}
      />
      <Button
        onClick={handleStripePayment}
        disabled={!stripe || isLoading}
        className="w-full mt-2 bg-blue-500 text-white"
      >
        {isLoading ? "Processing..." : "Checkout with Stripe"}
      </Button>
    </div>
  );
}
