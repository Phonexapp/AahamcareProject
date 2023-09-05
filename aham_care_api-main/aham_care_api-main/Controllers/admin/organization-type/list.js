const Express = require("express");
const OrganizationType = require("../../../models/OrganizationType");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = async (req, res) => {
  const { excludeInactive, isDropdown } = req.query;
  console.log(excludeInactive, isDropdown);
  let match = {};
  if (excludeInactive === "true") {
    match = { status: { $ne: "inactive" } };
  }
  let project = {};
  if (isDropdown === "true") {
    project = { name: 1 };
  }

  try {
    const organizationTypes = await OrganizationType.find(
      match,
      project
    ).lean();
    res.status(200).json({ organizationTypes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
