import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaymentMethodSelector from "../component/PaymentMethodSelector";
import { on } from "events";

const ResortDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [scrolling, setScrolling] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const resort = {
    id: 1,
    name: "Kuriftu Resort & Spa Bishoftu",
    location: "Bishoftu",
    description:
      "Experience luxury by the crater lake with stunning views and serene surroundings.",
    longDescription:
      "Nestled along the shores of Lake Bishoftu, our flagship resort offers a perfect blend of luxury and natural beauty.",
    coordinates: { lat: 8.7333, lng: 38.9833 },
    rating: 4.8,
    reviews: 246,
    services: [
      {
        id: 1,
        name: "Luxury Spa",
        description: "Full-service spa with traditional Ethiopian treatments",
        icon: "spa",
      },
      {
        id: 2,
        name: "Fine Dining",
        description: "Lakeside restaurant with local and international cuisine",
        icon: "restaurant",
      },
      {
        id: 3,
        name: "Water Sports",
        description: "Kayaking, paddle boarding, and boat tours on the lake",
        icon: "sailing",
      },
      {
        id: 4,
        name: "Infinity Pool",
        description: "Stunning infinity pool overlooking the crater lake",
        icon: "pool",
      },
    ],
    events: [
      {
        id: 1,
        name: "Sunset Yoga Retreat",
        date: "April 20, 2025",
        time: "5:00 PM - 7:00 PM",
        description:
          "Join our expert yoga instructor for a peaceful sunset session by the lake, followed by meditation and refreshments.",
        capacity: 20,
        spotsLeft: 8,
        price: "1,500 ETB",
        image: "/path/to/yoga-retreat.jpg",
      },
      {
        id: 2,
        name: "Ethiopian Wine Tasting",
        date: "April 25, 2025",
        time: "7:00 PM - 9:30 PM",
        description:
          "Sample the finest Ethiopian wines paired with gourmet appetizers.",
        capacity: 30,
        spotsLeft: 12,
        price: "2,000 ETB",
        image: "/path/to/wine-tasting.jpg",
      },
      {
        id: 3,
        name: "Weekend Wellness Package",
        date: "May 1-3, 2025",
        time: "All Day",
        description:
          "A comprehensive wellness weekend including spa treatments and yoga.",
        capacity: 15,
        spotsLeft: 5,
        price: "12,000 ETB",
        image: "/path/to/wellness-weekend.jpg",
      },

    ],
    images: [
      "/path/to/bishoftu-1.jpg",
      "/path/to/bishoftu-2.jpg",
      "/path/to/bishoftu-3.jpg",
      "/path/to/bishoftu-4.jpg",
    ],
  };

  const handleRsvpPayment = (event) => {
    console.log(`RSVP clicked for event ${event.id}`);
    setSelectedEventId(event.id);
  };

  const handleClosePayment = () => {
    console.log("ResortDetailsPage: Closing payment modal");
    setSelectedEventId(null);
  };

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!resort) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-16">
      <header
        className={`fixed top-0 left-0 right-0 z-20 transition-all ${
          scrolling ? "bg-blue-900 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center p-4">
          <button
            onClick={handleGoBack}
            className="text-white p-2 rounded-full bg-blue-800 bg-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-lg font-bold text-white">{resort.name}</h1>
        </div>
      </header>

      <div className="relative w-full h-64">
        <img
          src={resort.images[0]}
          alt={resort.name}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/fallback.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-bold">{resort.name}</h1>
          <div className="flex items-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1">{resort.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span>{resort.reviews} reviews</span>
          </div>
          <div className="flex items-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="ml-1">{resort.location}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-10">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === "services"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Services ({resort.services.length})
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === "events"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Events ({resort.events.length})
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-3 font-medium text-sm flex-shrink-0 border-b-2 transition-colors ${
              activeTab === "gallery"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Gallery
          </button>
        </div>
      </div>

      <div className="px-4 py-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-xl font-bold mb-3">About This Resort</h2>
            <p className="text-gray-700 mb-6">{resort.longDescription}</p>
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="bg-gray-200 h-48 rounded-lg mb-6 flex items-center justify-center text-gray-500">
              Map View
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-blue-600 font-bold text-lg">
                  {resort.services.length}
                </div>
                <div className="text-gray-600">Services</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-blue-600 font-bold text-lg">
                  {resort.events.length}
                </div>
                <div className="text-gray-600">Events</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("services")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explore Services
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className="w-full mt-3 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Browse Events
            </button>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <h2 className="text-xl font-bold mb-3">Our Services</h2>
            <p className="text-gray-700 mb-6">
              Discover all the amenities and services available at {resort.name}
              .
            </p>
            <div className="space-y-4">
              {resort.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start"
                >
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                    <span>{service.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <h2 className="text-xl font-bold mb-3">Upcoming Events</h2>
            <p className="text-gray-700 mb-6">
              Join us for these special events and experiences at {resort.name}.
            </p>
            <div className="space-y-6">
              {resort.events.map((event) => {
                const amount =
                  parseInt(event.price.replace(/[^0-9]/g, "")) || 0;
                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/fallback.jpg")}
                      />
                      {event.spotsLeft < 5 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Only {event.spotsLeft} spots left!
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{event.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {event.date}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {event.time}
                      </div>
                      <p className="text-gray-600 text-sm mt-3">
                        {event.description}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-blue-600 font-bold">
                          {event.price}
                        </div>
                        <button
                          onClick={() => handleRsvpPayment(event)}
                          className="py-2 px-4 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                        >
                          RSVP Now
                        </button>
                      </div>
                      {selectedEventId === event.id && (
                        <PaymentMethodSelector
                          amount={amount}
                          eventId={event.id}
                          onClose={handleClosePayment}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "gallery" && (
          <div>
            <h2 className="text-xl font-bold mb-3">Photo Gallery</h2>
            <p className="text-gray-700 mb-6">
              Explore the beauty of {resort.name} through our photo gallery.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {resort.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${resort.name} - Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/fallback.jpg")}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResortDetailsPage;
