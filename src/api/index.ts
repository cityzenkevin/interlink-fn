import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: url,
});

export const localUrl = url;

interface ErrorResponse {
  message: string;
}

export const handleErrorResponse = (error: any): ErrorResponse => {
  if (error.response !== undefined) {
    return { message: error.response.data.message };
  }
  return { message: error.message };
};
export default api;
