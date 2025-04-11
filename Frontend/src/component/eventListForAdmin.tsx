import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchEvents,
  deleteEvent,
  updateEvent,
} from "../redux/slices/eventSlice";
import { toast } from "react-toastify";

const EventList = () => {
  const dispatch = useAppDispatch();
  const { events, status, error } = useAppSelector((state) => state.events);
  const user = useAppSelector((state) => state.auth.user);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleDelete = async (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(eventId));
        toast.success("Event deleted");
      } catch (err) {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleEditClick = (event: any) => {
    setEditId(event._id);
    setEditData({
      title: event.title,
      date: event.date.slice(0, 10),
      location: event.location,
      description: event.description,
    });
  };

  const handleEditSubmit = async () => {
    if (!editData.title || !editData.date || !editData.location) {
      toast.error("All fields must be filled");
      return;
    }
    if (editId) {
      try {
        await dispatch(updateEvent({ eventId: editId, updates: editData }));
        toast.success("Event updated");
        setEditId(null);
      } catch (err) {
        toast.error("Failed to update event");
      }
    }
  };

  if (status === "loading")
    return <div className="text-center">Loading...</div>;
  if (status === "failed")
    return <div className="text-center text-red-600">{error}</div>;

  const renderAdminControls = (event: any) => {
    if (user?.role === "admin") {
      return (
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => handleEditClick(event)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(event._id)}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Event List</h2>
      {events.map((event) => (
        <div
          key={event._id}
          className="border p-4 rounded-lg shadow mb-4 bg-white"
        >
          {editId === event._id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Event Title"
              />
              <input
                type="date"
                value={editData.date}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editData.location}
                onChange={(e) =>
                  setEditData({ ...editData, location: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Event Location"
              />
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Event Description"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p className="text-sm text-gray-700">{event.description}</p>
              {renderAdminControls(event)}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
