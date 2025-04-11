// components/MembershipCard.tsx
import React from "react";
import { useGetQRCodeQuery } from "../redux/api/userApi";

const MembershipCard = () => {
  const { data, isLoading } = useGetQRCodeQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <h2 className="text-lg font-semibold">Your Membership QR</h2>
      <img
        src={data.qrCode}
        alt="Membership QR Code"
        className="mx-auto mt-2 w-48 h-48"
      />
    </div>
  );
};

export default MembershipCard;
