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
    return <p>Loading...</p>;
  }

  if (status === "failed" && error) {
    return <p>Error: {error}</p>;
  }

  if (!receipt) {
    return <p>Receipt not found</p>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Payment Receipt</h1>
      <p>
        <strong>Transaction Ref:</strong> {receipt.tx_ref}
      </p>
      <p>
        <strong>Amount:</strong> {receipt.amount} ETB
      </p>
      <p>
        <strong>Status:</strong> {receipt.status}
      </p>
      <p>
        <strong>Event:</strong> {receipt.eventId}
      </p>
      <p>
        <strong>Date:</strong> {new Date(receipt.paymentDate).toLocaleString()}
      </p>
    </div>
  );
};

export default ReceiptPage;
