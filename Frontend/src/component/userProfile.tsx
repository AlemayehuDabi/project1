import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUserProfile } from "../features/user/userSlice";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { name, email, points, tier, events, status, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, status]);

  if (status === "loading")
    return <p className="text-center text-lg">Loading...</p>;
  if (status === "failed")
    return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {name}'s Profile
      </h1>

      <div className="space-y-4">
        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-600">{email}</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Points:</span>
          <span className="text-gray-600">{points}</span>
        </div>

        <div className="flex justify-between text-lg">
          <span className="font-medium text-gray-700">Tier:</span>
          <span className="text-gray-600">{tier}</span>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Upcoming Events
        </h2>
        {events.length > 0 ? (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event._id} className="border-b border-gray-300 pb-4">
                <div className="text-lg font-medium text-gray-800">
                  {event.name}
                </div>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-gray-600">{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming events</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
