module.exports = {
  name: "ping",
  description: "Botun gecikmesini gösterir.",
  execute(message, args) {
    message.reply(`🏓 Pong! Gecikme: ${Date.now() - message.createdTimestamp}ms`);
  }
};
