import express from "express";
import {
  initiatePayment,
  handleChapaWebhook,
  fetchReceipt,
} from "../controller/paymentController";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/webhook", handleChapaWebhook); // Changed to a generic webhook endpoint
router.get("/receipt/:tx_ref", fetchReceipt);

export default router;
