import { Request, Response } from "express";
import { Payment } from "../models/paymentModel";
import { initiateChapaPayment } from "../service/chapaService";
import { generateQRCode } from "../util/generateQRCode";

export const initiatePayment = async (req: Request, res: Response) => {
  const { amount, eventId, paymentMethod, user } = req.body;

  const tx_ref = `tx-${Date.now()}`;

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
      eventId,
      amount,
      status: "pending",
      paymentMethod,
      transactionId: tx_ref, // Using tx_ref as transactionId for simplicity
      paymentDate: new Date(),
    });
    await payment.save();

    // Generate QR code for payment verification
    const qrCode = await generateQRCode(payment.transactionId);

    res.json({ paymentUrl, qrCode });
  } catch (err) {
    console.error("Payment initiation error", err);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};

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
      await payment.save();
    }

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: "Webhook error" });
    return;
  }
};

export const fetchReceipt = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payment = await Payment.findOne({ tx_ref: req.params.tx_ref });
    if (!payment) {
      res.status(404).json({ error: "Receipt not found" });
      return;
    }
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    return;
  }
};
