// src/controllers/message.controller.js
const messageService = require("../services/message.service");

class MessageController {
  // Yangi xabar yuborish kontrolleri
  async sendMessage(req, res) {
    try {
      const { chatId, senderId, text } = req.body;

      if (!chatId || !senderId || !text) {
        return res
          .status(400)
          .json({ message: "chatId, senderId va text majburiy!" });
      }

      const message = messageService.sendMessage(chatId, senderId, text);

      return res.status(201).json(message);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Serverda xatolik!", error: error.message });
    }
  }
}

module.exports = new MessageController();
