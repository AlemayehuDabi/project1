import { Request, Response } from "express";
import { Event } from "../models/eventModel";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err });
  }
};

export const registerForEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const userId = req.userId;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.usersRegistered.includes(userId)) {
      event.usersRegistered.push(userId);
      await event.save();
    }

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const getEvents = async (req, res) => {
  const { page = 1, search, filters } = req.query;
  const eventsPerPage = 10;

  const query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" }; // search by title
  }
  if (filters.date) {
    query.date = { $gte: new Date(filters.date) };
  }
  if (filters.location) {
    query.location = { $regex: filters.location, $options: "i" };
  }

  try {
    const events = await Event.find(query)
      .skip((page - 1) * eventsPerPage)
      .limit(eventsPerPage);
    const totalEvents = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEvents / eventsPerPage);

    res.json({ events, totalPages, currentPage: page });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
