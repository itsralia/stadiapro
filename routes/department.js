const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const departmentController = require("../controllers/department")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", departmentController.getDepartment);
router.post('/adddepartment', departmentController.addDepartment)
router.get("/edit/:id", departmentController.getEditDepartment);
router.post("/:id", departmentController.editDepartment);
router.delete("/deletedepartments/:id", departmentController.deleteDepartment)

module.exports = router;
