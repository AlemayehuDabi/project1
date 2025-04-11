import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface UserState {
  name: string | null;
  email: string | null;
  points: number;
  tier: string;
  events: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: UserState = {
  name: null,
  email: null,
  points: 0,
  // bronze, sliver, gold, platinum
  tier: "Silver",
  events: [],
  status: "idle",
  error: null,
};

// Fetch user profile data
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async () => {
    const response = await axios.get("/api/user/profile");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.points = action.payload.points;
        state.tier = action.payload.tier;
        state.events = action.payload.events;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch profile";
      });
  },
});

export default userSlice.reducer;
