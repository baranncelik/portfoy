const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const isAunthenticated = require("../middleware/auth");

router.get("/", userControllers.getIndex);
router.get("/home", (req, res) => res.redirect('/#home'));
router.get("/about-me", (req, res) => res.redirect('/#about-me'));
router.get("/resume", (req, res) => res.redirect('/#resume'));
router.get("/project", (req, res) => res.redirect('/#project'));
router.get("/blog", (req, res) => res.redirect('/#blog'));
router.get("/contact", (req, res) => res.redirect('/#contact'));

router.post("/" ,userControllers.postIndex);

router.get("/restore_page", userControllers.getRestorePage);

router.get("/blog/:id" , userControllers.getBlog);

router.post("/blog/:id" , userControllers.postBlog);


module.exports = router;