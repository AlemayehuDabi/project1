import React, { useState } from "react";
import PaymentMethodSelector from "../component/PaymentMethodSelector"; // Import the PaymentMethodSelector component

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
      title: "Art & Wine Night",
      date: "2025-04-22",
      location: "Kuriftu Entoto",
      description: "Sip wine and paint with Ethiopia’s top artists.",
      amount: 2000, // Dynamic price for this event
    },

    {
      _id: "4",
      title: "Art & Wine Night",
      date: "2025-04-22",
      location: "Kuriftu Entoto",
      description: "Sip wine and paint with Ethiopia’s top artists.",
      amount: 2000, // Dynamic price for this event
    },
  ];

  // State to track the selected event ID for payment
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Function to handle clicking the purchase button
  const handlePurchaseClick = (eventId: string) => {
    setSelectedEventId(eventId); // Set the event ID to display the payment selector
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid gap-4">
        {dummyEvents.map((event) => (
          <div
            key={event._id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString()} – {event.location}
            </p>
            <p className="mt-2">{event.description}</p>
            <p className="mt-4 text-lg font-bold">Price: {event.amount} ETB</p>

            {/* Button to proceed to payment */}
            {selectedEventId !== event._id && (
              <button
                onClick={() => handlePurchaseClick(event._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
