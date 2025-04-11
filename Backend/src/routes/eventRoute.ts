import express from "express";
import {
  createEvent,
  getEvents,
  registerForEvent,
} from "../controllers/eventController";

import { authorizeAdmin } from "../middleware/authAdmin";
import { authenticateUser } from "../middleWare/authenticateUser";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, createEvent); // POST /api/events
router.get("/", getEvents); // GET /api/events
router.post("/:eventId/register", authenticateUser, registerForEvent); // POST /api/events/:eventId/register

export default router;

router.post("/", createEvent);
