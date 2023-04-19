const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const maintainanceController = require("../controllers/maintainance")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/:id", maintainanceController.getMaintainance);
router.post('/addmaintainance', maintainanceController.addMaintainance)
router.get("/edit/:id", maintainanceController.geteditMaintainance);
router.post("/:id", maintainanceController.editMaintainance);
router.delete("/deletemaintainance/:id", maintainanceController.deleteMaintainance)
// router.get('/:facilityId', maintainanceController.getMaintainance);


module.exports = router;
