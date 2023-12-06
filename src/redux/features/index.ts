import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleErrorResponse, localUrl } from "../../services";

interface ApiState {
  data: any;
  loading: boolean;
  [entityName: string]: any;
}

interface CreateBody {
  body: any;
  url: string;
  headers?: any;
}

export const fetchApiData = createAsyncThunk(
  "api/fetchData",
  async (url: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(localUrl + url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      let entityName: string = url.split("/").pop() as string;
      console.log(entityName);
      if (entityName.split("?").length > 1) {
        entityName = `${entityName.split("?")[0]}Query`;
      }
      return { entityName, data: res.data };
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const deleteApiData = createAsyncThunk(
  "api/deleteData",
  async (url: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(localUrl + url, {
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

export const createApiData = createAsyncThunk(
  "api/createData",
  async ({ body, url, headers }: CreateBody, { rejectWithValue }) => {
    try {
      const res = await axios.post(localUrl + url, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          ...headers,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

export const updateApiData = createAsyncThunk(
  "api/updateData",
  async ({ body, url }: CreateBody, { rejectWithValue }) => {
    try {
      const res = await axios.patch(localUrl + url, body, {
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

const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        const { entityName, data } = action.payload;
        state.loading = false;
        state[entityName] = data;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(deleteApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteApiData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createApiData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApiData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export default apiSlice;
