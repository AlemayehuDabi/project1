// components/MembershipCard.tsx
import React from "react";
import { useGetQRCodeQuery } from "../redux/api/userApi";

const MembershipCard = () => {
  const { data, isLoading } = useGetQRCodeQuery();

  if (isLoading)
    return <p className="text-center text-lg text-gray-600">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs mx-auto text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Membership QR
      </h2>

      <div className="flex justify-center items-center">
        <img
          src={data?.qrCode}
          alt="Membership QR Code"
          className="mx-auto mt-2 w-48 h-48 rounded-lg shadow-md"
        />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p>Scan this QR code for membership verification at our locations.</p>
      </div>
    </div>
  );
};

export default MembershipCard;
