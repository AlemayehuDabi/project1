import QRCode from "qrcode";

// This function generates a QR code and returns the data URL
export const generateQRCode = async (text: string): Promise<string> => {
  try {
    const qrCode = await QRCode.toDataURL(text);
    return qrCode;
  } catch (err) {
    throw new Error("QR Code generation failed");
  }
};
