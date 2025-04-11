import axios from "axios";

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

interface PaymentRequestBody {
  amount: number;
  eventId: string;
  user: User;
  paymentMethod: string;
}

export const initiateChapaPayment = async (
  amount: number,
  user: User,
  paymentMethod: string,
  tx_ref: string
) => {
  const callback_url = `https://yourdomain.com/api/payments/verify/${tx_ref}`;
  const return_url = `https://yourfrontend.com/payment-success`;

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
          title: "Kuriftu Event Booking",
          description: "Event Payment via Chapa",
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
