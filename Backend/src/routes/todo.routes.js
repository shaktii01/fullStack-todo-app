const express = require("express");
const todoController = require("../controllers/todo.controllers");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.use(authMiddleware);
router.post("/todos", todoController.createTodo);
router.get("/todos", todoController.getTodos);
router.put("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);   

module.exports = router;