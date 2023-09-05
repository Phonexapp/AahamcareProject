const Express = require("express");
const OrganizationType = require("../../../models/OrganizationType");
/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = async (req, res) => {
  let { id } = req.params;
  try {
    const organizationType = await OrganizationType.findById(id);
    organizationType.toggleStatus();
    await organizationType.save();
    res.status(200).json({ organizationType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
