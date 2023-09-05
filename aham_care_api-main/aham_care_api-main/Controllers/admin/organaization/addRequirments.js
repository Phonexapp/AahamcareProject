const Requirements = require("../../../models/requirment");
const xlsx = require("xlsx");

addRequirment = async (excel, centerId) => {
  try {
    console.log(excel);
    const workbook = xlsx.readFile(`public/uploads/excel/${excel.filename}`);
    const sheet = workbook.Sheets["Sheet1"];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const reuirement = await new Requirements({
      organization: centerId,
      excelPath: `/uploads/excel/${excel.filename}`,
      requirement: jsonData,
    }).save();

    return reuirement;
  } catch (error) {
    return error.messgae;
  }
};

module.exports = { addRequirment };
