import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Alert } from 'antd';
// create User
export const signUp = createAsyncThunk("signUp", async (data, { rejectWithValue }) => {
   
    try {
     const response = await axios.post("http://localhost:5000/api/auth/signup", {
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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      // Use rejectWithValue to pass a custom error payload
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const logout = createAsyncThunk("logout", async () => {
  try {
    await axios.post("http://localhost:5000/api/auth/logout");
    return 
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const checkAuth = createAsyncThunk("checkAuth", async (data) => {
  try {
    const token = localStorage.getItem("token");
    let config = { headers: { Authorization: `Bearer ${token}` },};
    const res = await axios.get( "http://localhost:5000/api/auth/profile",
        config
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
