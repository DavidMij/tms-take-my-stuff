import { parse } from "cookie";
import * as jose from "jose";
import { loadStripe } from "@stripe/stripe-js";

export const extractUserIdFromCookies = async (cookie) => {
  const { tmsToken } = parse(cookie || "");
  const { payload } = await jose.jwtVerify(
    tmsToken,
    new TextEncoder().encode(process.env.TOKEN_SECRET)
  );

  return payload.userId;
};


export async function checkout({lineItems}){
  let stripePromise = null

  const getStripe = () => {
    if(!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
    }
    return stripePromise
  }

  const stripe = await getStripe()

  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems,
    successUrl: `${window.location.href}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  })

}