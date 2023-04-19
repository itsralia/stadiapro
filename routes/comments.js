const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

//Post Routes - simplified for now

router.post("/createcomment/:id", commentsController.createComment)

module.exports = router;
