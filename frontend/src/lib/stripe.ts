import { loadStripe, type Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null> | null = null;

const getStripePublishableKey = () => {
  return process.env.STRIPE_PUBLISHABLE_KEY || "";
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
