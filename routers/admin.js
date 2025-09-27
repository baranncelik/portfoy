const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const upload = require("../middleware/multer");
const isAunthenticated = require("../middleware/auth");

router.get("/settings", isAunthenticated, adminController.getSettings);
router.post("/settings", isAunthenticated, upload.fields([{ name: "profile_photo", maxCount: 1 }, { name: "cv" }]), adminController.postSettings);

router.get("/messages", isAunthenticated, adminController.getMessages);
router.post("/messages", isAunthenticated, adminController.postMessages);

router.get("/add-project", isAunthenticated, adminController.getAddProject);
router.post("/add-project", isAunthenticated, upload.fields([{ name: "img_url", maxCount: 1 }]), adminController.postAddProject);

router.get("/show-projects", isAunthenticated, adminController.getShowProjects);
router.get("/edit-project/:id", isAunthenticated, adminController.getEditProject);
router.post("/edit-project/:id", isAunthenticated, upload.fields([{ name: "img_url", maxCount: 1 }]), adminController.postEditProject);

router.get("/add-posts", isAunthenticated, adminController.getAddPost);
router.post("/add-posts", isAunthenticated, upload.fields([{ name: "image_url", maxCount: 1 }]), adminController.postAddPost);

router.get("/show-posts", isAunthenticated, adminController.getShowPosts);
router.get("/edit-post/:id", isAunthenticated, adminController.getEditPost);
router.post("/edit-post/:id", isAunthenticated, upload.fields([{ name: "image_url", maxCount: 1 }]), adminController.postEditPost);

router.get("/add-certifica", isAunthenticated, adminController.getAddCertifica);
router.post("/add-certifica", isAunthenticated, upload.fields([{ name: "pdf"}]), adminController.postAddCertifica);

router.get("/show-certificas", isAunthenticated, adminController.getShowCertificas);
router.get("/edit-certifica/:id", isAunthenticated, adminController.getEditCertifica);
router.post("/edit-certifica/:id", isAunthenticated, upload.fields([{ name: "pdf", maxCount: 1 }]), adminController.postEditCertifica);

router.post("/delete-project/:id", isAunthenticated , adminController.postDeleteProject);
router.post("/delete-post/:id", isAunthenticated , adminController.postDeletePost);
router.post("/delete-certifica/:id", isAunthenticated , adminController.postDeleteCertifica);




module.exports = router;
