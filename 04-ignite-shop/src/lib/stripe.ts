import Stripe from "stripe";
import { loadStripe } from '@stripe/stripe-js';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: 'Teste Shop',
  },
  
})


// import Stripe from "stripe";

// const key = process.env.STRIPE_SECRET_KEY ?? "";

// export const stripe = new Stripe(key, {
//   apiVersion:"2022-11-15",
//   appInfo: {
//     name: "Ignite Shop",
//   },
// });


