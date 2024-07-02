const express = require("express");
const toDoRouter = express.Router();
const toDoController = require("../controllers/ToDoController");
const { validateToDoRequest } = require("../middlewares/RequestValidator");

const createValidationMiddleware = (type) => (req, res, next) => validateToDoRequest(type, req, res, next);

toDoRouter.post("/new", createValidationMiddleware("create"), toDoController.createToDo)
toDoRouter.get("/all", toDoController.getAllToDo)
toDoRouter.get("/:id", toDoController.getToDoById)
toDoRouter.put("/:id", createValidationMiddleware("edit"), toDoController.editToDo)
toDoRouter.delete("/:id", toDoController.deleteToDo)

module.exports = toDoRouter;