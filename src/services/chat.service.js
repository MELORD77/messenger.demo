const { chats } = require("../data/chats.data");

class ChatService {
  createOrGetChat(senderId, receiverId) {
    let chat = chats.find(
      (c) =>
        c.participants.includes(senderId) &&
        c.participants.includes(receiverId),
    );

    if (!chat) {
      chat = {
        id: String(chats.length + 1),
        participants: [senderId, receiverId],
        lastMessage: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      chats.push(chat);
    }

    return chat;
  }

  getUserChats(userId) {
    let userChats = chats.filter((c) => c.participants.includes(userId));

    return userChats.sort((a, b) => b.updatedAt - a.updatedAt);
  }
}

module.exports = new ChatService();
