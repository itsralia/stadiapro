const express = require("express");
const router = express.Router();
const adminauthController = require("../controllers/adminauth");
const adminController = require("../controllers/admin")
const postsController = require("../models/Post")
const { ensureAuth, ensureGuest, ensureAdmin } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", adminController.getIndex);
router.get("/dashboard", ensureAdmin, adminController.getDashboard);
router.get("/getuser", adminController.getUserForm);
router.get("/allusers", adminController.getAllUsers);

router.post('/createadmin', adminController.createDefaultAdminUser)
router.post('/adduser', adminController.addUser)
router.get("/login", adminauthController.getAdminLogin);
router.post("/login", adminauthController.postAdminLogin);
// router.get("/logout", adminauthController);

// router.get("/edit/:id", departmentController.getEditDepartment);
// router.post("/:id", departmentController.editDepartment);
router.delete("/deleteuser/:id", adminController.deleteUser)

module.exports = router;
