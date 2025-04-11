import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyPayment } from "../redux/Slice/paymentSlice";

const ReceiptPage = () => {
  const { tx_ref } = useParams(); // Retrieve the transaction reference from the URL
  const dispatch = useAppDispatch();

  // Get payment status and receipt from Redux store
  const { receipt, status, error } = useAppSelector((state) => state.payment);

  // Dispatch verifyPayment to fetch payment verification details
  useEffect(() => {
    if (tx_ref) {
      dispatch(verifyPayment({ transactionId: tx_ref }));
    }
  }, [tx_ref, dispatch]);

  // Render loading or error state
  if (status === "pending") {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (status === "failed" && error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!receipt) {
    return <p className="text-center text-gray-500">Receipt not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-6">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Payment Receipt
      </h1>
      <div className="space-y-4">
        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Transaction Ref:</span>
          <span className="text-gray-600">{receipt.tx_ref}</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Amount:</span>
          <span className="text-gray-600">{receipt.amount} ETB</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Status:</span>
          <span
            className={`text-lg ${
              receipt.status === "successful"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {receipt.status}
          </span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Event:</span>
          <span className="text-gray-600">{receipt.eventId}</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Payment Date:</span>
          <span className="text-gray-600">
            {new Date(receipt.paymentDate).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
