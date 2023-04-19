const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const serviceController = require("../controllers/service")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", serviceController.getService);
router.post('/addservice', serviceController.addService)
router.get("/edit/:id", serviceController.geteditService);
router.post("/:id", serviceController.editService);
router.delete("/deleteservice/:id", serviceController.deleteService)

module.exports = router;
