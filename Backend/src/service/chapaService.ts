import axios from "axios";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export const initiateChapaPayment = async (
  amount: number,
  user: User,
  paymentMethod: string,
  tx_ref: string
) => {
  const callback_url = `http://localhost:5000/api/payments/webhook`;
  const return_url = `http://localhost:5173/payment-success`;

  // Validate inputs
  if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    throw new Error("Valid email is required");
  }
  if (!user.firstName || !user.lastName) {
    throw new Error("First name and last name are required");
  }
  if (amount <= 0 || isNaN(amount)) {
    throw new Error("Amount must be a positive number");
  }
  if (!paymentMethod) {
    throw new Error("Payment method is required");
  }
  const validMethods = ["telebirr", "momo", "card"]; // Adjust based on Chapa docs
  if (!validMethods.includes(paymentMethod.toLowerCase())) {
    throw new Error(
      `Invalid payment method: ${paymentMethod}. Must be one of ${validMethods.join(
        ", "
      )}`
    );
  }
  if (!process.env.CHAPA_SECRET) {
    throw new Error("CHAPA_SECRET environment variable is missing");
  }

  console.log("CHAPA_SECRET:", process.env.CHAPA_SECRET);

  // Format phone number (add +251 if provided and not already prefixed)
  let phone_number = "";
  if (user.phoneNumber) {
    phone_number = user.phoneNumber.startsWith("+")
      ? user.phoneNumber
      : `+251${user.phoneNumber.replace(/^0/, "")}`;
  }

  try {
    const payload = {
      amount: Number(amount),
      currency: "ETB",
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number, // Empty string if not provided
      tx_ref,
      callback_url,
      return_url,
      payment_methods: [paymentMethod.toLowerCase()],
      customization: {
        title: "Kuriftu Event & Service Booking",
        description: "Payment for Events or Services via Chapa",
      },
      meta: {
        hide_receipt: !!user.phoneNumber, // true if phoneNumber exists, false otherwise
      },
    };
    console.log("Sending to Chapa:", JSON.stringify(payload, null, 2));

    const chapaRes = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET}`,
        },
      }
    );

    console.log("Chapa response:", chapaRes.data);
    return chapaRes.data.data.checkout_url;
  } catch (err) {
    console.error(err);
  }
};
