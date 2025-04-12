import React, { useState } from "react";
import GebetaMapDirections from "../component/GebetaMapDirection"; // Import GebetaMapDirections
import { fetchEvents } from "../redux/Slice/eventSlice";

interface EventListProps {
  events: any[];
  totalPages: number;
  currentPage: number;
  dispatch: Function;
}

const EventList: React.FC<EventListProps> = ({
  events,
  totalPages,
  currentPage,
  dispatch,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // State to track selected event
  const [eventCoords, setEventCoords] = useState<[number, number] | null>(null); // State to hold event coordinates

  const handleDirectionsClick = async (event: any) => {
    setSelectedEvent(event);

    // Use geocoding to get the latitude and longitude of the event location
    try {
      const coords = await geocodeLocation(event.location);
      setEventCoords(coords);
    } catch (error) {
      console.error("Error geocoding location:", error);
    }
  };

  const geocodeLocation = async (
    location: string
  ): Promise<[number, number]> => {
    // Use OpenCage or other geocoding API to get coordinates
    const apiKey = "YOUR_OPENCAGE_API_KEY"; // Replace with your OpenCage API Key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return [lat, lng]; // Return coordinates
    }

    throw new Error("Location not found.");
  };

  return (
    <div className="event-list">
      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 border-b text-left text-sm font-semibold text-gray-600">
              Event Name
            </th>
            <th className="p-4 border-b text-left text-sm font-semibold text-gray-600">
              Date
            </th>
            <th className="p-4 border-b text-left text-sm font-semibold text-gray-600">
              Location
            </th>
            <th className="p-4 border-b text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id} className="hover:bg-gray-50">
              <td className="p-4 border-b text-sm">{event.title}</td>
              <td className="p-4 border-b text-sm">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="p-4 border-b text-sm">{event.location}</td>
              <td className="p-4 border-b text-sm">
                <button className="btn btn-edit mr-2">Edit</button>
                <button className="btn btn-delete">Delete</button>
                {/* Add Directions Button */}
                <button
                  className="btn btn-directions"
                  onClick={() => handleDirectionsClick(event)}
                >
                  Directions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination mt-6 flex justify-between items-center">
        <button
          className="btn btn-prev px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-next px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* If an event is selected, show the directions map */}
      {selectedEvent && eventCoords && (
        <GebetaMapDirections
          eventCoords={eventCoords} // Pass event coordinates
        />
      )}
    </div>
  );

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) {
      // Dispatch the fetch events action with the new page number
      dispatch(fetchEvents({ page }));
    }
  }
};

export default EventList;
