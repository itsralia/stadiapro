const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const regressionController = require("../controllers/regression")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", regressionController.getRegression);
// router.post('/addinspect', inspectController.addInspect)
// router.get("/edit/:id", inspectController.geteditInspect);
// router.post("/:id", inspectController.editInspect);
// router.delete("/deleteinspect/:id", inspectController.deleteInspect)

module.exports = router;
