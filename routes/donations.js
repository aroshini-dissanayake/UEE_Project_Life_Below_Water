const express = require("express");
const DonationRouter = express.Router();

const {
  NewDonation,
  GetDonations,
  UpdateDonation,
  DeleteDonation,
  GetOneOrganization,
} = require("../controllers/donation.controller");
const userauth = require("../middleware/userauth");

DonationRouter.post("/adddonation/:eventID", userauth, NewDonation);
DonationRouter.get("/getdonation", GetDonations);
DonationRouter.get("/getonedonation/:donationID", GetOneOrganization);
DonationRouter.put("/updatedonation/:donationID", userauth, UpdateDonation);
DonationRouter.delete("/deletedonation/:donationID", DeleteDonation);

module.exports = DonationRouter;
