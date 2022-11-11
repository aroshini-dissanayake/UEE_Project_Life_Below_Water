const mongoose = require("mongoose");
const OrganizationMembersSchema = mongoose.Schema({
  organizationID: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  user_id: {
    type: String,
    required: false,
  },
});

const OrganizationMembers = mongoose.model(
  "OrganizationMembers",
  OrganizationMembersSchema
);
module.exports = OrganizationMembers;
