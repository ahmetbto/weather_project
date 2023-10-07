const express = require("express");
const router = express.Router()

const userController = require("../Controllers/userController");


router.post("/signin", userController.signin);
router.post("/login", userController.login);
router.post("/log", userController.createLog);
router.get("/log", userController.getLogsById);
router.get("/currentUser", userController.currentUser);





module.exports = router;