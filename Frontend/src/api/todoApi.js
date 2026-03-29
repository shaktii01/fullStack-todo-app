import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000/api/todos",
  withCredentials: true, 
  

});
export const getTodos = () => API.get("/todos");

export const createTodo = (data) => API.post("/todos", data);

export const updateTodo = (id, data) =>
  API.put(`/todos/${id}`, data);

export const deleteTodo = (id) =>
  API.delete(`/todos/${id}`);

