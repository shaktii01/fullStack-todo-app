import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, 
  

});

export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const resetPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", { email });
  return response.data;
};

export const resetPasswordWithToken = async (token, newPassword) => {
  const response = await API.post(`/auth/reset-password/${token}`, {
    newPassword,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

export default API; 