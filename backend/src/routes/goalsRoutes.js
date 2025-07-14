import express from "express";
import { createGoal, deleteGoal, getAllGoals, getGoalById, updateGoal } from "../contollers/goalsController.js";

const router = express.Router();

router.get("/", getAllGoals);
router.get("/:id", getGoalById);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export default router; 