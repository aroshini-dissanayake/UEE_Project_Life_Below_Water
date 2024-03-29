const Donations = require("../models/donations.models");
const Events = require("../models/event.models");
const Organizations = require("../models/organizations.models");
const User = require("../models/users.models");

//add new donations
const NewDonation = async (req, res) => {
  const user = await User.findById(req.User._id);
  let eventID = req.params.eventID;
  let { amount, donatorName, paymenttype, depositeDate, receipt } = req.body;

  const event = await Events.findById(eventID);
  if (!event) {
    throw new Error("There is no event");
  }

  if (!user) {
    throw new Error("There is no user");
  }

  let donation = new Donations({
    userID: req.User._id,
    amount: amount,
    donatorName: donatorName,
    paymenttype: paymenttype,
    depositeDate: depositeDate,
    // receipt: receipt,
    eventID: eventID,
    eventTitle: event.eventTitle,
  });

  donation.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "New Donations Added Successfully !!",
    });
  });
};

//get all donations
const GetDonations = async (req, res) => {
  Donations.find().exec((err, donations) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingDonations: donations,
    });
  });
};

//getone
const GetOneOrganization = async (req, res) => {
  let donationID = req.params.donationID;
  Donations.findById(donationID, (err, donations) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingDonations: donations,
    });
  });
};

//update donations
const UpdateDonation = async (req, res) => {
  const user = await User.findById(req.User._id);

  const donationID = req.params.donationID;
  const { amount, donatorName, depositeDate, receipt } = req.body;

  try {
    if (!user) {
      throw new Error("There is no user");
    }

    const donation = await Donations.findById(donationID);
    if (!donation) {
      throw new Error("There is no donation");
    }

    const updateDonation = await Donations.findOneAndUpdate(
      { _id: donationID },
      {
        amount: amount,
        donatorName: donatorName,
        depositeDate: depositeDate,
        // receipt: receipt,
      }
    );
    res.status(200).send({
      status: "Donation Details Updated Successfully",
      updated: updateDonation,
    });
  } catch (err) {
    res
      .status(500)
      .send({ status: "Error with update donation", error: err.message });
  }
};

//delete donations
const DeleteDonation = (req, res) => {
  Donations.findByIdAndRemove(req.params.donationID).exec(
    (err, deletedonations) => {
      if (err)
        return res.status(400).json({
          message: "Deletion Unsuccessfull",
          err,
        });

      return res.json({
        message: "Deletion Successfull",
        deletedonations,
      });
    }
  );
};

module.exports = {
  NewDonation,
  GetDonations,
  UpdateDonation,
  DeleteDonation,
  GetOneOrganization,
};
