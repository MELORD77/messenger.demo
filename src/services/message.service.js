// src/services/message.service.js
const { messages, chats } = require("../data/chats.data");

class MessageService {
  sendMessage(chatId, senderId, text) {
    const newMessage = {
      id: String(messages.length + 1),
      chatId,
      senderId,
      text,
      isRead: false,
      createdAt: new Date(),
    };

    messages.push(newMessage);

    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      chat.lastMessage = newMessage;
      chat.updatedAt = new Date();
    }

    return newMessage;
  }
}

module.exports = new MessageService();
