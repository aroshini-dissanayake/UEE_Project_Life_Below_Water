const Events = require("../models/event.models");
const Organizations = require("../models/organizations.models");

//add new donations
const NewEvent = async (req, res) => {
  let organizationID = req.params.organizationID;
  let { eventTitle, venue, eventTime, eventDate, description, eventImage } =
    req.body;
  let date = new Date();

  const organization = await Organizations.findById(organizationID);
  if (!organization) {
    throw new Error("There is no organization");
  }

  let event = new Events({
    eventTitle: eventTitle,
    organizationName: organization.organizationName,
    venue: venue,
    eventTime: eventTime,
    eventDate: eventDate,
    description: description,
    eventImage: eventImage,
    date: date.toISOString().slice(0, 10),
    organizationID: organizationID,
  });

  event.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "New Card Added Successfully !!",
    });
  });
};

//get all events
const GetAllEvents = async (req, res) => {
  Events.find().exec((err, events) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEvents: events,
    });
  });
};

//get specific events
const GetOneEvent = async (req, res) => {
  const eventID = req.params.eventID;
  const organizationID = req.params.organizationID;

  try {
    // validate product
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
    }

    const organization = await Organizations.findById(organizationID);
    if (!organization) {
      throw new Error("There is no organization");
    }
    const events = await Events.find({ organizationID: organizationID });

    //console.log(ratings);
    res.status(200).send({ events: events });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error with read Event", error: error.message });
    console.log(error);
  }
};

//update an event
const UpdateEvent = async (req, res) => {
  const organizationID = req.params.organizationID;
  const eventID = req.params.eventID;
  const { eventTitle, venue, eventTime, eventDate, description } = req.body;

  try {
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
    }

    const organization = await Organizations.findById(organizationID);
    if (!organization) {
      throw new Error("There is no organization");
    }

    const updateEvent = await Events.findOneAndUpdate(
      { _id: eventID },
      {
        eventTitle: eventTitle,
        venue: venue,
        eventTime: eventTime,
        eventDate: eventDate,
        description: description,
      }
    );
    res
      .status(200)
      .send({ status: "Feedback Updated", updatedevent: updateEvent });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with update Feedback", error: err.message });
  }
};

const DeleteEvent = async (req, res) => {
  const organizationID = req.params.organizationID;
  const eventID = req.params.eventID;

  try {
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
    }

    const organization = await Organizations.findById(organizationID);
    if (!organization) {
      throw new Error("There is no organization");
    }

    const deleteEvents = await Events.findByIdAndDelete(eventID);
    res
      .status(200)
      .send({ status: "Event Deleted", deletedEvents: deleteEvents });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with delete Event", error: err.message });
  }
};

module.exports = {
  NewEvent,
  GetAllEvents,
  GetOneEvent,
  UpdateEvent,
  DeleteEvent,
};
