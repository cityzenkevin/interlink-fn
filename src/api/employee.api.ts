import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localUrl, handleErrorResponse } from ".";

export const getEmployees = createAsyncThunk(
  "lecturer/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}employe`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      return { employee: res.data };
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const getSingleEmployee = createAsyncThunk(
  "lecturer/getSingleEmployee",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}lecturer/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "lecturer/removeEmployee",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${localUrl}lecturer/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const createEmployee = createAsyncThunk(
  "lecturer/createEmployee",
  async (lecturer: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}lecturer`, lecturer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

