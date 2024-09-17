import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId } = req.body;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }
  if (!priceId) {
    res.status(400).json({ error: "Price not found" });
  }

  const success_url = `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
