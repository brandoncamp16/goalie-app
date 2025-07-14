import express from "express";
import { createActivity, deleteActivity, getAllActivities, getActivityById, updateActivity } from "../contollers/activitiesController.js";

const router = express.Router();

router.get("/", getAllActivities);
router.get("/:id", getActivityById);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router; 