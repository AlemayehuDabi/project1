import express from "express";
import {
  createEvent,
  getEvents,
  registerForEvent,
} from "../controller/eventController";

import { authorizeAdmin, authenticateUser } from "../middleWare/protect";

const router = express.Router();

router.post("/", authenticateUser, authorizeAdmin, createEvent); // POST /api/events
router.get("/", getEvents); // GET /api/events
router.post("/:eventId/register", authenticateUser, registerForEvent); // POST /api/events/:eventId/register

export default router;

router.post("/", createEvent);
