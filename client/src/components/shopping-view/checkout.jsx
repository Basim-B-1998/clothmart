import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "@/components/shopping-view/stripecheckout"; // make sure casing matches file name

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function ShoppingCheckout() {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckout amount={1000} />
    </Elements>
  );
}
