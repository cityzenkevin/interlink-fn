import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrorResponse, localUrl } from ".";
import axios from "axios";

const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return { users: res.data };
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${localUrl}user/${id}`, {
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

const removeUser = createAsyncThunk(
  "user/removeUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${localUrl}/users/${id}`, {
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

export const createUser = createAsyncThunk(
  "user/createUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${localUrl}/users`, user, {
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${localUrl}/users/${user.id}`,
        {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);
export default {
  getSingleUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
};
