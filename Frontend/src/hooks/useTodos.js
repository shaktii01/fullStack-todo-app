import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todoApi";

const useTodos = () => {
  const [todos, setTodos] = useState([]);


  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  const addTodo = async (data) => {
    await createTodo(data);
    await fetchTodos(); 
  };

  const toggleTodo = async (todo) => {
    await updateTodo(todo._id, {
      ...todo,
      completed: !todo.completed,
    });
    await fetchTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    await fetchTodos();
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};

export default useTodos;