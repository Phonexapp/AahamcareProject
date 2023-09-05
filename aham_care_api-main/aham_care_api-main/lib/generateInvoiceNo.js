const moment = require("moment");
module.exports = () => {
  const currentDate = moment();
  const yearPart = currentDate.format("YY");
  const monthPart = currentDate.format("MM");
  const dayPart = currentDate.format("DD");

  const randomNumber = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(5, "0");

  return "INV"+ yearPart + monthPart + dayPart + randomNumber;
};
