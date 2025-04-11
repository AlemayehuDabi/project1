import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks.ts";
import { createEvent } from "../redux/Slice/eventSlice.ts";
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
      <div className="text-red-600 font-semibold p-4 text-center">
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
      className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8"
    >
      <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        Create New Event
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Event Title"
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Event Location"
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        rows={4}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;
