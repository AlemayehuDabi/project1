import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { initiatePayment } from "../redux/Slice/paymentSlice";

// Payment method options
const paymentMethods = ["Telebirr", "M-Birr"];

const PaymentMethodSelector: React.FC<{ amount: number; eventId: string }> = ({
  amount,
  eventId,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();

  const handlePay = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    dispatch(
      initiatePayment({ amount, eventId, paymentMethod: selectedPaymentMethod })
    )
      .unwrap()
      .then((paymentUrl) => {
        window.location.href = paymentUrl;
      })
      .catch((err) => console.error("Payment error:", err));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
      <div className="mb-4">
        {paymentMethods.map((method) => (
          <div key={method} className="flex items-center mb-2">
            <input
              type="radio"
              id={method}
              name="paymentMethod"
              value={method}
              onChange={() => setSelectedPaymentMethod(method)}
              className="mr-2"
            />
            <label htmlFor={method} className="text-lg">
              {method}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handlePay}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Pay with {selectedPaymentMethod || "selected method"}
      </button>
    </div>
  );
};

export default PaymentMethodSelector;
