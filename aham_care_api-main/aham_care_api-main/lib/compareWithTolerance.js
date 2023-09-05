module.exports = function compareWithTolerance(
    value1 = 0,
    value2 = 0,
    tolerance = 0.01
  ) {
    const roundedValue1 = Math.round(Number(value1) * 100) / 100;
    const roundedValue2 = Math.round(Number(value2) * 100) / 100;
  
    return Math.abs(roundedValue1 - roundedValue2) <= tolerance;
  };