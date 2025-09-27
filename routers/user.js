const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const isAunthenticated = require("../middleware/auth");

router.get("/", userControllers.getIndex);


router.post("/" ,userControllers.postIndex);

router.get("/restore_page", userControllers.getRestorePage);

router.get("/blog/:id" , userControllers.getBlog);

router.post("/blog/:id" , userControllers.postBlog);


module.exports = router;