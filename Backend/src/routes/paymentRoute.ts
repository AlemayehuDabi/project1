import express from "express";
import {
  initiatePayment,
  handleChapaWebhook,
  fetchReceipt,
} from "../controller/paymentController";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.post("/verify/:tx_ref", handleChapaWebhook);
router.get("/receipt/:tx_ref", fetchReceipt);

export default router;
