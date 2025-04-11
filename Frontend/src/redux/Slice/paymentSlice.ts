// features/payment/paymentSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../util/api";
import axios from "axios";

// Start a payment
export const initiatePayment = createAsyncThunk<
  string,
  {
    amount: number;
    eventId: string;
    paymentMethod: string;
  }
>("payment/initiate", async ({ amount, eventId, paymentMethod }) => {
  const response = await axios.post(`${api}/payments/initiate`, {
    amount,
    eventId,
    paymentMethod,
  });
  return response.data.paymentUrl;
});

// Verify payment after redirect
export const verifyPayment = createAsyncThunk<
  {
    status: string;
    receipt: any;
  },
  { transactionId: string }
>("payment/verify", async ({ transactionId }) => {
  const res = await axios.get(`${api}/payments/verify/${transactionId}`);
  return res.data; // { status, receipt }
});

// Slice state
interface PaymentState {
  loading: boolean;
  error: string | null;
  paymentUrl: string | null;
  status: "idle" | "pending" | "success" | "failed";
  receipt: any | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  paymentUrl: null,
  status: "idle",
  receipt: null,
};

// Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.loading = false;
      state.error = null;
      state.paymentUrl = null;
      state.status = "idle";
      state.receipt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentUrl = null;
      })
      .addCase(
        initiatePayment.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.paymentUrl = action.payload;
        }
      )
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Payment initiation failed";
      })

      .addCase(verifyPayment.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status =
          action.payload.status === "success" ? "success" : "failed";
        state.receipt = action.payload.receipt;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Payment verification failed";
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
