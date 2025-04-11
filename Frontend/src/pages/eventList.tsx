import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import PaymentMethodSelector from "../component/PaymentMethodSelector"; // Import the PaymentMethodSelector component
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/Slice/eventSlice"; // Assuming you have this slice

// Socket connection
const socket = io("http://localhost:5000"); // Update with your backend server URL

const EventListPage: React.FC = () => {
  // Example events with dynamic amounts for each event
  const dummyEvents = [
    {
      _id: "1",
      title: "Kuriftu Pool Party",
      date: "2025-04-20",
      location: "Kuriftu Resort, Bishoftu",
      description: "Come enjoy live music, pool games, and cocktails!",
      amount: 1500, // Dynamic price for this event
    },
    {
      _id: "2",
      title: "Art & Wine Night",
      date: "2025-04-22",
      location: "Kuriftu Entoto",
      description: "Sip wine and paint with Ethiopia’s top artists.",
      amount: 2000, // Dynamic price for this event
    },
    {
      _id: "3",
      title: "Cooking Class",
      date: "2025-04-25",
      location: "Kuriftu Resort",
      description: "Learn the secrets of Ethiopian cuisine!",
      amount: 1200, // Dynamic price for this event
    },
    {
      _id: "4",
      title: "Live Jazz Night",
      date: "2025-05-01",
      location: "Kuriftu Entoto",
      description: "Enjoy a night of soulful jazz music.",
      amount: 1800, // Dynamic price for this event
    },
  ];

  // State to track the selected event ID for payment
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch events on page load (optional if you have real-time events via Socket.IO)
    // dispatch(fetchEvents());

    // Listen for notifications from the backend
    socket.on("eventNotification", (data: any) => {
      // Increment notification count and handle the message
      setNotifications((prevNotifications) => prevNotifications + 1);
    });

    return () => {
      socket.off("eventNotification"); // Clean up on component unmount
    };
  }, [dispatch]);

  const handlePurchaseClick = (eventId: string) => {
    setSelectedEventId(eventId); // Set the event ID to display the payment selector
  };

  const handleClearNotifications = () => {
    setNotifications(0); // Clear notifications when clicked
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Events</h1>

      {/* Notification Badge */}
      {notifications > 0 && (
        <div
          onClick={handleClearNotifications}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <span className="text-xs font-semibold">{notifications}</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {dummyEvents.map((event) => (
          <div
            key={event._id}
            className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all relative"
          >
            <h2 className="text-xl font-semibold text-blue-800">
              {event.title}
            </h2>
            <p className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString()} – {event.location}
            </p>
            <p className="mt-2 text-gray-700">{event.description}</p>
            <p className="mt-4 text-lg font-semibold text-blue-600">
              Price: {event.amount} ETB
            </p>

            {/* Button to proceed to payment */}
            {selectedEventId !== event._id && (
              <button
                onClick={() => handlePurchaseClick(event._id)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 w-full transition duration-300 ease-in-out hover:bg-blue-600"
              >
                Purchase Event
              </button>
            )}

            {/* Show PaymentMethodSelector if the user has selected this event */}
            {selectedEventId === event._id && (
              <PaymentMethodSelector
                amount={event.amount}
                eventId={event._id}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListPage;
