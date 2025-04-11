import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import EventList from "../components/EventList";
import CreateEventForm from "../components/CreateEventForm";
import { fetchEvents } from "../redux/slices/eventSlice";
import Pagination from "../components/Pagination";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { events, status, totalPages, currentPage } = useAppSelector(
    (state) => state.events
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Event Creation Form */}
      {user?.role === "admin" && <CreateEventForm />}

      {/* Event List */}
      {status === "loading" ? <div>Loading events...</div> : <EventList />}

      {/* Pagination */}
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
};

export default AdminDashboard;
