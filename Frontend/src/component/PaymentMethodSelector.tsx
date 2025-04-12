import React, { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { initiatePayment } from "../redux/Slice/paymentSlice";

// Payment method options
const paymentMethods = ["Telebirr", "M-Birr"];

const PaymentMethodSelector: React.FC<{
  amount: number;
  eventId: string;
  onClose: () => void;
}> = ({ amount, eventId, onClose }) => {
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

  // Close modal and reset state
  const handleClose = () => {
    console.log("Closing PaymentMethodSelector");
    setSelectedPaymentMethod(null);
    onClose(); // Call parent’s onClose
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4 transform transition-all duration-200">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Choose Payment Method
        </h2>

        {/* Amount and Event Info */}
        <div className="text-sm text-gray-500 mb-4">
          <p>Event ID: {eventId}</p>
          <p>Amount: {amount} ETB</p>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method}
              onClick={() => setSelectedPaymentMethod(method)}
              className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPaymentMethod === method
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                id={method}
                name="paymentMethod"
                value={method}
                checked={selectedPaymentMethod === method}
                onChange={() => setSelectedPaymentMethod(method)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor={method}
                className="ml-3 flex-1 text-gray-700 font-medium"
              >
                {method}
              </label>
              {/* Placeholder for icons */}
              <span className="text-gray-400 text-sm">Icon</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            disabled={!selectedPaymentMethod}
            className={`px-4 py-2 rounded-lg transition ${
              selectedPaymentMethod
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
