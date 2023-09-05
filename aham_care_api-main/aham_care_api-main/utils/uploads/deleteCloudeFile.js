const { Storage } = require("@google-cloud/storage");
const path = require("path");
// Set up Google Cloud Storage credentials
const gcsCredentials = {
  keyFilename: path.join(__dirname, "/eng-interface-382716-1a3445a78050.json"),
};

module.exports = async (filePath) => {
  try {
    const sanitizedFilePath = filePath.substring(1)
    const bucketName = process.env.BUCKET_NAME;
    const storage = new Storage(gcsCredentials);

    const file = storage.bucket(bucketName).file(sanitizedFilePath);
    await file.delete();

    return true
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
