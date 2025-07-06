"use client";

// pages/checkout.js or any component
import PayPalButton from "@/utils/paypal/PayPalButton";
import type { PayPalCaptureOrderResult } from "@/utils/paypal/PayPalButton";
import { useState } from "react";

const CheckoutPage = ({ price }: { price: number }) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderDetails, setOrderDetails] =
    useState<PayPalCaptureOrderResult | null>(null);

  const handlePaymentSuccess = (details: PayPalCaptureOrderResult) => {
    console.log("Payment successful:", details);
    setPaymentStatus("success");
    setOrderDetails(details);

    // Redirect to success page or show success message
    // router.push('/payment-success');
  };

  const handlePaymentError = (error: unknown) => {
    console.error("Payment error:", error);
    setPaymentStatus("error");
  };

  return (
    <>
      {paymentStatus === "success" && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Payment Successful!</strong>
          <p>Order ID: {orderDetails?.id}</p>
        </div>
      )}

      {paymentStatus === "error" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Payment Failed!</strong>
          <p>Please try again.</p>
        </div>
      )}

      <PayPalButton
        amount={price}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </>
  );
};

export default CheckoutPage;
