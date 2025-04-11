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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h1>{name}'s Profile</h1>
      <p>Email: {email}</p>
      <p>Points: {points}</p>
      <p>Tier: {tier}</p>

      <h2>Upcoming Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <strong>{event.name}</strong>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events</p>
      )}
    </div>
  );
};

export default UserProfile;
