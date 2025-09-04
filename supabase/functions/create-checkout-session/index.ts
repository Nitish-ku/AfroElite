import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.10.0";

console.log("Function starting up...");

serve(async (req) => {
  console.log("Request received:", req.method);

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    console.log("Attempting to get Stripe secret key...");
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set.");
      throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
    }
    console.log("Stripe secret key found.");

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2022-11-15",
    });
    console.log("Stripe client initialized.");

    const { order_id, client_email, client_price, title } = await req.json();
    console.log("Request body parsed:", { order_id, client_email, client_price, title });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: title,
            },
            unit_amount: Math.round(client_price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/order-details/${order_id}`,
      metadata: {
        order_id: order_id,
      },
      customer_email: client_email,
    });
    console.log("Stripe checkout session created:", session.id);

    return new Response(JSON.stringify({ sessionId: session.id }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  } catch (error) {
    console.error("Error in function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }
});
