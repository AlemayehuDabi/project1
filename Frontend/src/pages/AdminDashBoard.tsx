import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import CreateEventForm from "../component/createEvent.tsx";
import { fetchEvents } from "../redux/Slice/eventSlice.ts";
import Pagination from "../component/pagination.tsx";
import EventListPage from "./eventList.tsx";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { events, status, totalPages, currentPage } = useAppSelector(
    (state) => state.event
  );
  const user = useAppSelector((state) => state.auth.user);

  // For search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    location: "",
  });

  useEffect(() => {
    dispatch(fetchEvents({ page: currentPage, search: searchQuery, filters }));
  }, [dispatch, currentPage, searchQuery, filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Admin Dashboard
      </h1>

      {/* Search and Filters Section */}
      <div className="mb-8 flex items-center space-x-6 justify-center flex-wrap">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Event Creation Form */}
      {user?.role === "admin" && (
        <div className="mb-8">
          <CreateEventForm />
        </div>
      )}

      {/* Event List */}
      {status === "loading" ? (
        <div className="text-center text-lg text-gray-500">
          Loading events...
        </div>
      ) : (
        <EventListPage />
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
};

export default AdminDashboard;
