const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const staffController = require("../controllers/staff")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", staffController.getStaff);
router.post('/addstaff', staffController.addStaff)
router.get("/edit/:id", staffController.geteditStaff);
router.post("/:id", staffController.editStaff);
router.delete("/deletestaff/:id", staffController.deleteStaff)

module.exports = router;
