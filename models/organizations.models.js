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

  organizationMembers: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Organizations = mongoose.model("organizations", OrganizationsSchema);
module.exports = Organizations;
