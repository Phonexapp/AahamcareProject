

function deleteFile(filePath) {
  const fs = require('fs');

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist`);
  }

  // Delete the file
  fs.unlinkSync(filePath);
  return true;
}

module.exports = deleteFile;


