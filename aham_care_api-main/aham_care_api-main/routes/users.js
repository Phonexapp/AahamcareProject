var express = require("express");
var router = express.Router();
const oldAgeHomes = require("../Controllers/user/oldageHome");
const orphanage = require("../Controllers/user/orphanges");
const donation = require("../Controllers/user/donation");
const post = require("../Controllers/user/social");
const eventDonation = require("../Controllers/user/eventDonation");
const Store = require("../Controllers/admin/store/store");
const events = require("../Controllers/admin/events/events");
const storeDonation = require("../Controllers/user/storeDonation");
const mapLocation = require("../Controllers/map/getNearbyOrganaization");
const panCard = require("../Controllers/pancard/pancard");
const user = require("../Controllers/user/profile");
const pet = require("../Controllers/pet/Pet.js");
const { authenticateToken } = require('../utils/JWT')
const nodemailer = require("nodemailer");
const { transporter } = require("../lib/regardMail.js");
const axios = require('axios');
var express = require('express');
var app = express();
const fs=require("fs");



// Multer Setup

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let pathName = "public/uploads/post/images";
//     fs.mkdirSync(pathName, { recursive: true });
//     cb(null, pathName);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname === "image") {
//       cb(null, "public/uploads/post");
//     } else {
//       cb(null, "public/uploads/profile");
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

/* ============================================================== */
// V2
const division = require('../Controllers/user/division')
const Organaization = require('../Controllers/user/organaization')


/* Get Organaization */
router.get("/oldageHome", oldAgeHomes.getAllOldageHome);
router.get("/orphanage", orphanage.getAllOrphanage);
router.get("/pet", pet);


/* Donation */
router.post("/donation", donation);
// router.post("/donation", donation);

// Social Post
// router.post("/post", PostUpload.single("PostImage"), post.addPost);
router.post("/reaction", post.reaction);
// router.get("/post", post.getPosts);

// Event and Store Donation
router.post("/eventDonation", eventDonation);
router.post("/storeDonation", storeDonation);

// Store
router.get("/store", Store.getAllStore);

// Event
router.get("/event", events.getAllEvents);

// Map Locations
router.post("/getMapLocaton", mapLocation);

// PAN Card Varification
router.get("/pancard", panCard);

// User Profile
router.get("/user/:id", user.getProfileById);
// router.put("/user/:id", UserImage.single("profilePicture"), user.editProfile);
router.get('/getDonations', user.getDonations)
router.patch('/changePassword', user.changePassword)

// Division 
router.get('/allDivision', division.getAllDivision)

// get All Organizations By Division Id
router.get('/organizations/:typeId', Organaization.getAllorganaization)
router.get('/organizationsById/:orgId', Organaization.getOrganaizationById)


router.post("/Email", async (req, res) => {
  const info = await transporter.sendMail({
    from: `${req.body.From}`, // sender address
    to: `${req.body.To}`, // list of receivers
    subject: `${req.body.Subject}`, // Subject line
    text: `${req.body.Text}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
});

module.exports = router;
