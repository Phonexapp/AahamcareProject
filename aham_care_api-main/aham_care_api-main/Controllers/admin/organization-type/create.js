const Express = require("express");
const OrganizationType = require("../../../models/OrganizationType");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = async (req, res) => {
  let { body, file } = req;
  try {
    if (file) {
      body.image = `/uploads/images/${file.filename}`;
    }
    const organaizationType = new OrganizationType(body);
    await organaizationType.save();
    res.status(200).json({
      data: organaizationType,
      message: "Organization Type created successfully",
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: err.message,
    });
  }
};
