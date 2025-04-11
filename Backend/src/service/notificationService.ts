import nodemailer from "nodemailer";

// Create reusable transporter object using default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

export const sendNotification = (event: any) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com",
    subject: `Reminder: ${event.title}`,
    text: `This is a reminder for the event: ${event.title}. ${event.description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending notification:", error);
    } else {
      console.log("Notification sent: " + info.response);
    }
  });
};
