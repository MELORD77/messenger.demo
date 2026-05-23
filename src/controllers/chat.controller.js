// src/controllers/chat.controller.js
const chatService = require("../services/chat.service");

class ChatController {
  async createOrGetChat(req, res) {
    try {
      // VAQTINCHA: senderId ni ham body'dan olib turamiz (Postman'da test qilish oson bo'lishi uchun)
      const { senderId, receiverId } = req.body;

      if (!senderId || !receiverId) {
        return res
          .status(400)
          .json({ message: "senderId va receiverId majburiy!" });
      }

      // Servisimizni chaqiramiz
      const chat = chatService.createOrGetChat(senderId, receiverId);

      return res.status(200).json(chat);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Serverda xatolik!", error: error.message });
    }
  }

  async getUserChats(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "userId majburiy" });
      }

      const chats = chatService.getUserChats(userId);
      return res.status(200).json(chats);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Serverda xatolik!", error: error.message });
    }
  }
}

module.exports = new ChatController();
