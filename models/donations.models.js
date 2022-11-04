const mongoose = require("mongoose");
const DonationsSchema = mongoose.Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "events",
  },
  eventTitle: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },

  donatorName: {
    type: String,
    required: true,
  },

  paymenttype: {
    type: String,
    required: true,
  },

  depositeDate: {
    type: String,
    required: true,
  },

  receipt: {
    type: String,
    required: true,
  },
});

const Donations = mongoose.model("donations", DonationsSchema);
module.exports = Donations;
