import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../services/api";

import { toast } from "react-hot-toast";
// create User
export const createProduct = createAsyncThunk("/createProduct", async (data) => {
    
  try {
   
    const response = await API.post("/products",
      data,
     { withCredentials: true}
    );
  console.log(response.data,'data');
  return response.data;
} catch (error) {
  return isRejectedWithValue(error.response);
}
});
export const deleteProduct = createAsyncThunk("/deleteProduct", async (data) => {
    
  try {
   
    await API.delete(`/products/${data}`,{ withCredentials: true});
    return data;

} catch (error) {
  return isRejectedWithValue(error.response);
}
});
// read User
export const fetchAllProducts = createAsyncThunk("/fetchAllProducts", async (data) => {
  try {
    
    const res = await API.get("/products",{ withCredentials: true});

    console.log(res.data);
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const toggleFeaturedProduct = createAsyncThunk("/toggleFeaturedProduct", async (data) => {
  try {
   
    console.log('data',data)
      
    const res = await API.get(`/products/${data}`,{ withCredentials: true});

    console.log(res.data);
    return res.data; 
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const fetchFeaturedProducts = createAsyncThunk("/fetchFeaturedProducts", async (data) => {
  try {
    
    const res = await API.get("/products/featured",{ withCredentials: true});
    return res.data;
  } catch (error) {
    return isRejectedWithValue(error.response);
  }
});
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
   
      const response = await API.get(
        `/products/category/${category}`,
         { withCredentials: true}

      );
      console.log('productsssssssss',response.data);
      
      return response.data.products; // Payload for the fulfilled case
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
      return rejectWithValue(error.response?.data?.error || "Failed to fetch products");
    }
  }
);
