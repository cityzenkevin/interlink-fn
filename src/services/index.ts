import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: url,
});

export const localUrl = url;

interface ErrorResponse {
  message: string;
  data: any;
}

export const handleErrorResponse = (error: any): ErrorResponse => {
  if (error.response !== undefined) {
    return {
      message: error.response.data.message,
      data: error.response.data,
    };
  }
  return { message: error.message, data: null };
};

export default api;
