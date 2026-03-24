import express from "express";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    forwardTask
} from "./task.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createTask);
router.get("/getalltask", protect, getTasks);
router.put("/update/:id", protect, updateTask);
router.delete("/delete/:id", protect, deleteTask);

// custom routes
router.patch("/:id/toggle", protect, toggleTaskStatus);
router.patch("/:id/forward", protect, forwardTask);

export default router;