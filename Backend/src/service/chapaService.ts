import axios from "axios";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export const initiateChapaPayment = async (
  amount: number,
  user: User,
  paymentMethod: string,
  tx_ref: string
) => {
  const callback_url = `http://localhost:5000/api/payments/webhook`; // Updated to match new route
  const return_url = `http://localhost:5173/payment-success`;

  try {
    const chapaRes = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount,
        currency: "ETB",
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        tx_ref,
        callback_url,
        return_url,
        payment_methods: [paymentMethod],
        customization: {
          title: "Kuriftu Event & Service Booking",
          description: "Payment for Events or Services via Chapa",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET}`,
        },
      }
    );

    return chapaRes.data.data.checkout_url;
  } catch (err) {
    throw new Error("Chapa payment initiation failed");
  }
};
