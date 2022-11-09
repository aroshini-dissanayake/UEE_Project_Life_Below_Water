const Events = require("../models/event.models");
const Organizations = require("../models/organizations.models");

//add new donations
const NewEvent = async (req, res) => {
  let organizationID = req.params.organizationID;
  let {
    eventTitle,
    venue,
    eventTime,
    eventDate,
    eventdescription,
    eventImage,
  } = req.body;
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
    eventdescription: eventdescription,
    eventImage: eventImage,
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

  try {
    // validate product
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
    }

    const events = await Events.find({ eventID: eventID });

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
  const eventID = req.params.eventID;
  const { eventTitle, venue, eventTime, eventDate, eventdescription } =
    req.body;

  try {
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
    }

    const updateEvent = await Events.findOneAndUpdate(
      { _id: eventID },
      {
        eventTitle: eventTitle,
        venue: venue,
        eventTime: eventTime,
        eventDate: eventDate,
        eventdescription: eventdescription,
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
  const eventID = req.params.eventID;

  try {
    const event = await Events.findById(eventID);
    if (!event) {
      throw new Error("There is no event");
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
