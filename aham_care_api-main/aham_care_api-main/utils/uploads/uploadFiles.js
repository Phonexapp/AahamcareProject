
const { Storage } = require("@google-cloud/storage");
const path = require("path");
// Set up Google Cloud Storage credentials
const gcsCredentials = {
  keyFilename: path.join(__dirname, "/eng-interface-382716-1a3445a78050.json"),
};

/**
 * An file upload fuction for Google Cloud Storage. It handle all types of files, whether sin
 * @param {object[]|object} files -Multer file object of files array
 * @returns
 */
module.exports = async function uploadFiles(files) {
  const bucketName = process.env.BUCKET_NAME;
  const storage = new Storage(gcsCredentials);

  // Handle single file upload case
  if (!Array.isArray(files)) {
    const { path, filename, fieldname, mimetype, destination: dest } = files;
    const newDest = dest.replace("public/uploads", "uploads");
    const destination = `${newDest}/${filename}`;

    await storage.bucket(bucketName).upload(path, {
      destination,
      metadata: { contentType: mimetype },
    });

    const file = await storage.bucket(bucketName).file(destination);
    const publicUrl = file.publicUrl();
    return [{ filename, publicUrl, path: `/${file.name}`, fieldname }];
  } else {
    // Handle multiple file upload case
    const promises = files.map(async (file) => {
      const { path, filename, mimetype, fieldname, destination: dest } = file;
      const newDest = dest.replace("public/uploads", "uploads");
      const destination = `${newDest}/${filename}`;

      await storage.bucket(bucketName).upload(path, {
        destination,
        metadata: { contentType: mimetype },
      });

      const uploaded = await storage.bucket(bucketName).file(destination);

      return {
        filename,
        publicUrl: uploaded.publicUrl(),
        fieldname,
        path: `/${uploaded.name}`,
      };
    });

    const results = await Promise.all(promises);

    return results;
  }
};