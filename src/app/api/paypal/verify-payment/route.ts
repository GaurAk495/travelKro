// pages/api/paypal/verify-payment.js (Pages Router)
// OR app/api/paypal/verify-payment/route.js (App Router)

import { NextRequest, NextResponse } from "next/server";

const PAYPAL_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.paypal.com"
    : "https://api.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      Authorization: `Basic ${Buffer.from(
        `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function verifyPayPalPayment(orderID: string, accessToken: string) {
  const response = await fetch(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
}

// App Router (uncomment for App Router)
export async function POST(request: NextRequest) {
  const { orderID } = await request.json();

  try {
    const accessToken = await getPayPalAccessToken();
    const orderDetails = await verifyPayPalPayment(orderID, accessToken);

    if (orderDetails.status === "COMPLETED") {
      return Response.json({
        success: true,
        message: "Payment verified successfully",
        orderDetails,
      });
    } else {
      return Response.json(
        {
          success: false,
          message: "Payment not completed",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return Response.json(
      {
        success: false,
        message: "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
