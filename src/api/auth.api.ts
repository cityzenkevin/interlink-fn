import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localUrl, handleErrorResponse } from ".";
import { Login } from "../types";

export const loginUser = createAsyncThunk(
  "user/login",
  async (myFields: Login, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}/auth/login`, myFields);
      localStorage.setItem("accessToken", res.data.tokens.access.token);
      console.log(res.data.tokens.access);
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}/forgotPassword`, { email });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    { email, token }: { email: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${localUrl}/reset/${token}`, {
        email,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

