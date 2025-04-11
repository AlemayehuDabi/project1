import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params: {
    page: number;
    search: string;
    filters: { date: string; location: string };
  }) => {
    const { page, search, filters } = params;
    const response = await axios.get(
      `/api/events?page=${page}&search=${search}&date=${filters.date}&location=${filters.location}`
    );
    return response.data;
  }
);

// Register for an event
export const registerForEvent = createAsyncThunk(
  "events/registerForEvent",
  async (eventId: string) => {
    const response = await axios.post(`/api/events/${eventId}/register`);
    return { eventId, message: response.data.message };
  }
);

// Create a new event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: {
    title: string;
    date: string;
    location: string;
    description: string;
  }) => {
    const response = await axios.post("/api/events", eventData);
    return response.data;
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId: string) => {
    await axios.delete(`/api/events/${eventId}`);
    return eventId;
  }
);

// Update an event
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({
    eventId,
    updates,
  }: {
    eventId: string;
    updates: {
      title: string;
      date: string;
      location: string;
      description: string;
    };
  }) => {
    const response = await axios.put(`/api/events/${eventId}`, updates);
    return response.data;
  }
);

interface EventState {
  events: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
  totalPages: 0,
  currentPage: 1,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload.events; // Assuming response contains an 'events' array
        state.totalPages = action.payload.totalPages; // Assuming response contains 'totalPages'
        state.currentPage = action.payload.currentPage; // Assuming response contains 'currentPage'
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch events";
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        // Optional: mark the event as registered
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload); // Add the new event
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index !== -1) state.events[index] = action.payload; // Update the event
      });
  },
});

export default eventSlice.reducer;
