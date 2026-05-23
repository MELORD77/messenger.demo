const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");

router.post("/", chatController.createOrGetChat);
router.get("/:userId", chatController.getUserChats);

module.exports = router;
