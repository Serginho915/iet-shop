import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const getStripePublishableKey = () => {
  // NEXT_PUBLIC_* is required for Next.js browser bundles.
  const nextPublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const reactAppKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
  return nextPublicKey || reactAppKey || "";
};

export const getStripeClient = () => {
  if (!stripePromise) {
    const publishableKey = getStripePublishableKey();
    if (!publishableKey) {
      throw new Error("Missing Stripe publishable key.");
    }
    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};
