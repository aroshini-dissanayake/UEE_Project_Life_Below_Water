const express = require("express");
const DonationRouter = express.Router();

const {
  NewDonation,
  GetDonations,
  UpdateDonation,
  DeleteDonation,
} = require("../controllers/donation.controller");
const userauth = require("../middleware/userauth");

DonationRouter.post("/adddonation/:organizationID/:eventID", NewDonation);
DonationRouter.get("/getdonation", GetDonations);
DonationRouter.put("/updatedonation/:donationID", userauth, UpdateDonation);
DonationRouter.delete("/deletedonation/:donationID", DeleteDonation);

module.exports = DonationRouter;
