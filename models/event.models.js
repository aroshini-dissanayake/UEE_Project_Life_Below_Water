const mongoose = require("mongoose");
const EventSchema = mongoose.Schema({
  organizationID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "organizations",
  },
  organizationName: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },

  venue: {
    type: String,
    required: true,
  },

  eventTime: {
    type: String,
    required: true,
  },

  eventDate: {
    type: String,
    required: true,
  },

  eventdescription: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
  },
});

const Events = mongoose.model("events", EventSchema);
module.exports = Events;
