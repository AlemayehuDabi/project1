import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks.ts";
import { createEvent } from "../redux/slices/eventSlice";
import { toast } from "react-toastify";

const CreateEventForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user); // Assuming auth slice
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="text-red-600 font-semibold p-4">
        Access denied. Only admins can create events.
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createEvent(formData)).unwrap();
      toast.success("Event created successfully!");
      setFormData({ title: "", date: "", location: "", description: "" });
    } catch (err) {
      toast.error("Failed to create event.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Event</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Event Location"
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="w-full p-2 mb-4 border rounded"
        rows={4}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
