import React from "react";

interface EventListProps {
  events: any[];
  totalPages: number;
  currentPage: number;
}

const EventList: React.FC<EventListProps> = ({
  events,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="event-list">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 border">Event Name</th>
            <th className="p-4 border">Date</th>
            <th className="p-4 border">Location</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td className="p-4 border">{event.title}</td>
              <td className="p-4 border">
                {new Date(event.date).toLocaleDateString()}
              </td>
              <td className="p-4 border">{event.location}</td>
              <td className="p-4 border">
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination mt-4">
        <button
          className="btn btn-prev"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-next"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
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
