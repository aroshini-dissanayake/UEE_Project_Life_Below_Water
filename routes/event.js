const express = require("express");
const EventRouter = express.Router();

const {
  NewEvent,
  GetAllEvents,
  GetOneEvent,
  UpdateEvent,
  DeleteEvent,
} = require("../controllers/event.controller");

EventRouter.post("/addevent/:organizationID", NewEvent);
EventRouter.get("/getallevents", GetAllEvents);
EventRouter.get("/getoneevent/:organizationID/:eventID", GetOneEvent);
EventRouter.put("/updateevent/:organizationID/:eventID", UpdateEvent);
EventRouter.delete("/deleteevent/:organizationID/:eventID", DeleteEvent);

module.exports = EventRouter;
