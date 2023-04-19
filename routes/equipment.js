const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const equipmentController = require("../controllers/equipment")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", equipmentController.getEquipment);
router.post('/addequipment', equipmentController.addEquipment)
router.get("/edit/:id", equipmentController.geteditEquipment);
router.post("/:id", equipmentController.editEquipment);
router.delete("/deleteequipment/:id", equipmentController.deleteEquipment)

module.exports = router;
