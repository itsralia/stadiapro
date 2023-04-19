const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const smsController = require("../controllers/sms")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", smsController.getSms);
router.post('/sendsms', smsController.sendSMS)
// router.get("/edit/:id", staffController.geteditStaff);
// router.post("/:id", staffController.editStaff);
// router.delete("/deletestaff/:id", staffController.deleteStaff)

module.exports = router;
