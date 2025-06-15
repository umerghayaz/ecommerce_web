import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../services/api";

// create User
export const signUp = createAsyncThunk("signUp", async (data, { rejectWithValue }) => {
   
    try {
     const response = await API.post("/auth/signup", {
       name:data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword 
      })
    console.log(response.data,'data');
    return response.data;
  } catch (error) {
   const errorMessage =
    error.response?.data?.message || "Signup failed. Please try again.";
    return rejectWithValue({ message: errorMessage });
  }
});

// read User
export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      },{
  withCredentials: true,
});

      return res.data;
    } catch (error) {
      // Use rejectWithValue to pass a custom error payload
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const logout = createAsyncThunk("logout", async () => {
  try {
    await API.post("/auth/logout");
    return 
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const checkAuth = createAsyncThunk("checkAuth", async (data) => {
  try {
   
    const res = await API.get("/auth/profile",
      );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const refreshToken = createAsyncThunk("refreshToken", async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/auth/refresh-token"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
