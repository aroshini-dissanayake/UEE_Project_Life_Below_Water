const Organizations = require("../models/organizations.models");

const NewOrganization = async (req, res) => {
  let newOrganization = new Organizations(req.body);
  newOrganization.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res
      .status(200)
      .send({
        organization: newOrganization,
      })
      .json({
        success: "New Organization add successfully!!!",
      });
  });
};

const GetOrganization = async (req, res) => {
  Organizations.find().exec((err, organizations) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingOrganizations: organizations,
    });
  });
};

const GetOneOrganization = async (req, res) => {
  let organizationID = req.params.organizationID;
  Organizations.findById(organizationID, (err, organization) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingOrganizations: organization,
    });
  });
};

const UpdateOrganization = (req, res) => {
  Organizations.findByIdAndUpdate(
    req.params.organizationID,
    {
      $set: req.body,
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
};

const DeleteOrganization = (req, res) => {
  Organizations.findByIdAndRemove(req.params.organizationID).exec(
    (err, deleteorganizations) => {
      if (err)
        return res.status(400).json({
          message: "Deletion Unsuccessfull",
          err,
        });

      return res.json({
        message: "Deletion Successfull",
        deleteorganizations,
      });
    }
  );
};

module.exports = {
  NewOrganization,
  GetOrganization,
  GetOneOrganization,
  UpdateOrganization,
  DeleteOrganization,
};
