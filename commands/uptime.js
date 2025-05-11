const { uptime } = require("os");

module.exports = {
  name: "uptime",
  description: "Botun ne kadar süredir açık olduğunu gösterir.",
  execute(message, args) {
    const totalSeconds = process.uptime();
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    message.reply(`🕐 Bot aktif: ${hours} saat, ${minutes} dakika, ${seconds} saniye`);
  }
};
