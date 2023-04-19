const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const frequencyController = require("../controllers/frequency")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", frequencyController.getFrequency);
router.post('/addfrequency', frequencyController.addFrequency)
router.get("/edit/:id", frequencyController.geteditFrequency);
router.post("/:id", frequencyController.editFrequency);
router.delete("/deletefrequency/:id", frequencyController.deleteFrequency)

module.exports = router;
