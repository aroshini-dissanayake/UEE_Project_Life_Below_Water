const Organization = require("../models/organizations.models");
const User = require("../models/users.models");
const OrganizationMembers = require("../models/organizationMembers.models");

const AddMember = async (req, res) => {
  const organizationID = req.params.organizationID;

  try {
    const organization1 = await Organization.findById(organizationID);
    const user = await User.findById(req.User._id);

    if (!organization1) {
      throw new Error("There is no organization..!!!");
    }

    if (!user) {
      throw new Error("There is no user");
    }

    // const member1 = await OrganizationMembers.find({ user_id: req.User._id });

    // if (member1) {
    //   throw new Error("User already exists");
    // }

    const member = {
      organizationID: organization1._id,
      organizationName: organization1.organizationName,
      name: user.name,
      user_id: user._id,
    };
    const newMember = new OrganizationMembers(member);

    await newMember.save();
    res.status(201).send({ success: true, Member: newMember });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

const GetOrganizationMembers = async (req, res) => {
  let oID = req.params.oID;
  try {
    const members = await OrganizationMembers.find({ organizationID: oID });
    if (!members) {
      throw new Error("There are no members in this organization");
    }

    res.status(201).send({ success: true, Members: members });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  AddMember,
  GetOrganizationMembers,
};
