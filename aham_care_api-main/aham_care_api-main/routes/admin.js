const express = require("express");
const router = express.Router();
const createOrganaization = require("../Controllers/admin/organaization/createOrganaization");
const updateOrganaization = require("../Controllers/admin/organaization/updateOrgnaization");
const addImages = require("../Controllers/admin/organaization/addImages");
const Recidence = require("../Controllers/admin/organaization/addRecience");
const Store = require("../Controllers/admin/store/store");
const events = require("../Controllers/admin/events/events");
const oldageHome = require("../Controllers/user/oldageHome");
const orphange = require("../Controllers/user/orphanges");

const storeDonations = require("../Controllers/admin/store/storeDonation");
const eventDonations = require("../Controllers/admin/events/eventDonation");
const orders = require('../Controllers/admin/orders/orders')
const division = require ('../Controllers/admin/organaization/division/division')
const organaization = require ('../Controllers/admin/organaization/division/organization')
const requirement = require ('../Controllers/admin/organaization/division/requirement')

const OrganizationType = require("../Controllers/admin/organization-type");
const Dashboard = require('../Controllers/admin/dashboard/dashBoard');

const User = require('../Controllers/admin/users/Users')


const multer = require("multer");
const Users = require("../Controllers/admin/users/Users");

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathName = "public/uploads/excel";
    if (file.fieldname === "excel") {
      return cb(null, pathName);
    }

    if (file.fieldname === "pdf") {
      return cb(null, "public/uploads/pdf");
    }
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Multer

// Organization Routs//
router.post("/organaization", upload.any(), createOrganaization);
router.put("/organaization/:id", upload.any(), updateOrganaization.updateOrganaization);
router.post("/addImages", upload.any(), addImages);
router.post("/addImages/:id", upload.any(), addImages);

// router.post("/addRecidence/:id", upload.single("photo"), addRecidence);
router.get("/getOldageHome", oldageHome.getAllOldageHome);
router.get("/getOldageHome/:id", oldageHome.getOldageHomeById);
router.get("/orphange", orphange.getAllOrphanage);
router.get("/orphange/:id", orphange.getOrphangeById);

// Store

router.post("/store", upload.single("photo"), Store.createStore);
router.post("/store", Store.createStore);

router.put("/deleteStore/:id", Store.deleteStore);
router.get("/store", Store.getAllStore);
router.get("/store/:id", Store.getStoreById);
router.put("/store/:id",upload.single("photo"), Store.editStore);
router.patch("/store-status/:storeId", Store.changeStoreStatus);

// Store Donations
router.get("/donations/:storeId", Store.getStoreDonations);
router.patch("/status/:storeId", Store.changeStoreStatus);
router.delete("/store-donation/:id", Store.deleteStoreDonation);
router.get("/storeDonationById/:id", storeDonations.getStoreDonationById);


// Events
router.post("/event", events.createEvent);
router.put("/editEvent/:id", events.editEvent);
router.patch("/eventStatus/:id", events.changeStatus);
router.patch("/deleteEvent/:id", events.deleteEvent);
router.get("/event", events.getAllEvents);
router.get("/event/:id", events.getEventById);


// Event Donatios
router.get("/eventDonation/:eventId", events.getEventDonations);
router.get("/eventDonationById/:id", eventDonations.getEventDonationById);

// Orders Org
router.get('/organizationOrders', orders.getAllOrgOrders)
router.get('/organizationOrderById/:id', orders.getOrgOrderById)

// Store orders
router.get('/storeOrders', orders.getAllstoreOrders )

// Event Orders
router.get('/eventOrders', orders.getAllEventOrders)


// Divisions
router.post('/createDivision',division.createDivison)
router.get('/division',division.getAllDivision)
router.get('/division/:id',division.getDivisionById)
router.put('/division/:id',division.updateDivision)
router.post('/division-order/',division.changeDivisionOrder)
router.patch('/division-status/:id',division.changeStatus)

// Organization 
router.get('/organaizatioByType/:typeId', organaization.getOrgnaizationByType)
router.get('/organaizatioById/:id', organaization.getOrgnaizationById)

// Requirement 
router.post('/requirement/:orgId', requirement.addRequirement)
router.get('/requirement/:orgId', requirement.getRequiremnt)
router.get('/requirement-by-id/:reqId', requirement.getById)
router.post('/update-status/:reqId', requirement.updateStatus)
router.put('/update-requirement/:reqId', requirement.updateRequirement)

// Attendece
router.post("/addRecidence/:orgId", upload.single("photo"), Recidence.addRecidence);
router.get("/getAllRecidence/:orgId", Recidence.getAllRecidenceByOrg);
router.patch("/recidence-status/:id", Recidence.updateStatus);
router.get("/recidence-by-id/:attId", Recidence.getById);
router.put("/update-recidence/:attId",upload.single("photo"), Recidence.updateRecidence);

// Dashboard
router.get("/dashboard", Dashboard.getAdminPanelDatails)

// User
router.get("/user",Users.getAllUser)
router.get("/user/:id",Users.getUserById)

module.exports = router;
