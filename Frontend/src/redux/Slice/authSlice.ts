import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the state shape
interface AuthState {
  user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null, // Persist token in localStorage
  status: "idle",
  error: null,
  isAuthenticated: false,
};

// Sign up action
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        userData
      );
      return response.data; // return user data and token
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  }
);

// Login action
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userData
      );
      return response.data; // return user data and token
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      // state.token = getCookie("accessToken");
      state.user = action.payload.user;
      state.error = null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Clear user data and token from state and localStorage
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    loginFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign up cases
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Signup failed";
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
