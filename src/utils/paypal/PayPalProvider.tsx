"use client";
// components/PayPalProvider.tsx
import {
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";
import { ReactNode } from "react";

interface PayPalProviderProps {
  children: ReactNode;
  currency?: string;
  intent?: "capture" | "authorize" | "subscription";
  components?: string;
  disableFunding?: string;
}

const PayPalProvider: React.FC<PayPalProviderProps> = ({
  children,
  currency = "USD",
  intent = "capture",
  components = "buttons",
  disableFunding = "credit,card",
}) => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("PayPal Client ID is not configured");
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong>Configuration Error:</strong> PayPal Client ID is not
        configured. Please add NEXT_PUBLIC_PAYPAL_CLIENT_ID to your environment
        variables.
      </div>
    );
  }

  const initialOptions: ReactPayPalScriptOptions = {
    clientId,
    currency,
    intent,
    components,
    // disableFunding,
    // Enable debug mode in development
    // debug: process.env.NODE_ENV === "development",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
};

export default PayPalProvider;
