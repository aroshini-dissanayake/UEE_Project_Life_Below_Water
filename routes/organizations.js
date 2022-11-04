const express = require("express");
const { AddMember } = require("../controllers/organization.members.controller");
const OrganizationRouter = express.Router();

const {
  NewOrganization,
  GetOrganization,
  GetOneOrganization,
  UpdateOrganization,
  DeleteOrganization,
} = require("../controllers/organizations.controller");
const userauth = require("../middleware/userauth");

OrganizationRouter.post("/addorganization", NewOrganization);
OrganizationRouter.get("/getorganization", GetOrganization);
OrganizationRouter.get("/:organizationID", GetOneOrganization);
OrganizationRouter.put("/update/:organizationID", UpdateOrganization);
OrganizationRouter.delete("/delete/:organizationID", DeleteOrganization);
OrganizationRouter.post("/addmember/:organizationID", userauth, AddMember);

module.exports = OrganizationRouter;
