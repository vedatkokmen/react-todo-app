const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");

// get all todos
router.get("/", getAllTodos).post("/", createTodo);
router
  .get("/:id", getTodoById)
  .put("/:id", updateTodo)
  .delete("/:id", deleteTodo);

module.exports = router;
