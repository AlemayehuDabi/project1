import { Request, Response } from "express";
import { Payment } from "../models/paymentModel";
import { initiateChapaPayment } from "../service/chapaService";
import { generateQRCode } from "../util/generateQRCode";

export const initiatePayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, eventId, serviceId, paymentMethod, user } = req.body;

  // Validate that at least one of eventId or serviceId is provided
  if (!eventId && !serviceId) {
    res.status(400).json({ error: "Either eventId or serviceId is required" });
    return;
  }

  const tx_ref = `tx-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`; // More unique tx_ref

  try {
    // Initiate Chapa payment
    const paymentUrl = await initiateChapaPayment(
      amount,
      user,
      paymentMethod,
      tx_ref
    );

    // Store the payment information in the DB
    const payment = new Payment({
      tx_ref,
      userId: user._id,
      eventId, // Will be undefined if not provided
      serviceId, // Will be undefined if not provided
      amount,
      status: "pending",
      paymentMethod,
      transactionId: tx_ref,
      paymentDate: new Date(),
    });
    await payment.save();

    // Generate QR code for payment verification
    const qrCode = await generateQRCode(payment.transactionId);

    res.json({ paymentUrl, qrCode });
  } catch (err) {
    console.error("Payment initiation error", err);
    res.status(500).json({ error: "Payment initiation failed" });
    return;
  }
};

// Webhook handler (unchanged, as it’s agnostic to eventId/serviceId)
export const handleChapaWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tx_ref, status } = req.body;

  try {
    const payment = await Payment.findOne({ tx_ref });
    if (!payment) {
      res.status(404).send("Payment not found");
      return;
    }
    if (status === "success") {
      payment.status = "completed";
    } else if (status === "failed") {
      payment.status = "failed";
    }
    await payment.save();

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Webhook error" });
  }
};

// Fetch receipt (unchanged)
export const fetchReceipt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payment = await Payment.findOne({
      tx_ref: req.params.tx_ref,
    }).populate("eventId serviceId userId");
    if (!payment) {
      res.status(404).json({ error: "Receipt not found" });
      return;
    }
    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
