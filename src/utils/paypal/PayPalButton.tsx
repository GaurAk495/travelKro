// components/PayPalButton.tsx
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

// Type definitions for PayPal
interface PayPalOrderData {
  orderID: string;
  payerID?: string;
  paymentID?: string;
  billingToken?: string;
  facilitatorAccessToken?: string;
}

interface PayPalActions {
  order: {
    create: (orderData: PayPalCreateOrderData) => Promise<string>;
    capture: () => Promise<PayPalCaptureOrderResult>;
  };
}

interface PayPalCreateOrderData {
  purchase_units: Array<{
    amount: {
      value: string;
      currency_code?: string;
    };
    description?: string;
    custom_id?: string;
    invoice_id?: string;
  }>;
  intent?: "CAPTURE" | "AUTHORIZE";
  application_context?: {
    shipping_preference?:
      | "NO_SHIPPING"
      | "GET_FROM_FILE"
      | "SET_PROVIDED_ADDRESS";
    user_action?: "PAY_NOW" | "CONTINUE";
    return_url?: string;
    cancel_url?: string;
  };
}

export interface PayPalCaptureOrderResult {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
  purchase_units: Array<{
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
      }>;
    };
  }>;
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
  };
}

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  description?: string;
  customId?: string;
  invoiceId?: string;
  onSuccess: (details: PayPalCaptureOrderResult) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  disabled?: boolean;
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "gold" | "blue" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?:
      | "paypal"
      | "checkout"
      | "buynow"
      | "pay"
      | "installment"
      | "subscribe"
      | "donate";
    tagline?: boolean;
    height?: number;
  };
}

const PayPalButton: React.FC<PayPalButtonProps> = ({
  amount,
  currency = "USD",
  description,
  customId,
  invoiceId,
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  style = {
    layout: "vertical",
    color: "blue",
    shape: "rect",
    label: "paypal",
  },
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [loading, setLoading] = useState<boolean>(false);

  const createOrder = (
    data: any, // Use 'any' to match PayPal SDK expectations
    actions: any
  ): Promise<string> => {
    const orderData: PayPalCreateOrderData = {
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: currency,
          },
          description,
          custom_id: customId,
          invoice_id: invoiceId,
        },
      ],
      intent: "CAPTURE",
      application_context: {
        shipping_preference: "NO_SHIPPING",
        user_action: "PAY_NOW",
      },
    };

    return actions.order.create(orderData);
  };

  const onApprove = async (
    data: any, // Use 'any' to match PayPal SDK expectations
    actions: any
  ): Promise<void> => {
    setLoading(true);
    try {
      const details = await actions.order.capture();

      // Call your backend API to verify the payment
      const response = await fetch("/api/paypal/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          details: details,
        }),
      });
      console.log(response);
      if (response.ok) {
        onSuccess(details);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      onError(
        error instanceof Error ? error : new Error("Unknown payment error")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any): void => {
    console.error("PayPal error:", error);
    onError(
      error instanceof Error ? error : new Error("PayPal error occurred")
    );
  };

  const handleCancel = (): void => {
    console.log("Payment cancelled");
    if (onCancel) {
      onCancel();
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-4">
        Loading PayPal...
      </div>
    );
  }

  return (
    <div className="paypal-button-container">
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={handleError}
        onCancel={handleCancel}
        disabled={loading || disabled}
        style={style}
      />
      {loading && (
        <div className="text-center mt-2 text-gray-600">
          <p>Processing payment...</p>
        </div>
      )}
    </div>
  );
};

export default PayPalButton;
