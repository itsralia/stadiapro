const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const locationController = require("../controllers/location")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/location", ensureAuth, locationController.getLocation);
router.get("/location/edit/:id", locationController.getEditLocation);
router.post("/location/:id", locationController.editLocation);
router.post("/addlocation", locationController.addLocation);
router.delete("/location/:id", locationController.deleteLocation)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
