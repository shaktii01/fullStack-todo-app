import axios from "axios";
import API from "./authApi";
export const getTodos = () => API.get("/todos/todos");

export const createTodo = (data) => API.post("/todos/todos", data);

export const updateTodo = (id, data) =>
  API.put(`/todos/todos/${id}`, data);

export const deleteTodo = (id) =>
  API.delete(`/todos/todos/${id}`);

