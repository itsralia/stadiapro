const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const facilityController = require("../controllers/facility")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", facilityController.getFacility);
router.post('/addfacility', facilityController.addFacility)
router.get("/edit/:id", facilityController.geteditFacility);
router.post("/:id", facilityController.editFacility);
router.delete("/deletefacility/:id", facilityController.deleteFacility)

module.exports = router;
