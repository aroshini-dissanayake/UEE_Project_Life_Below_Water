const mongoose = require("mongoose");
const OrganizationsSchema = mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  organizationImage: {
    type: String,
    required: false,
  },
});

const Organizations = mongoose.model("organizations", OrganizationsSchema);
module.exports = Organizations;
