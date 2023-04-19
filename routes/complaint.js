const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const complaintController = require("../controllers/complaint")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", complaintController.getComplaintForm);
router.post('/addcomplaint', complaintController.addComplaint);
// router.get("/edit/:id", complaintController.geteditComplaint);
// router.post("/:id", complaintController.editComplaint);
// router.delete("/deletecomplaint/:id", complaintController.deleteComplaint)

module.exports = router;
