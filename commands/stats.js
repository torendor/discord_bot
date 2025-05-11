const os = require("os");
const package = require("../package.json");

module.exports = {
  name: "stats",
  description: "Botun sistem istatistiklerini gösterir.",
  execute(message, args) {
    message.reply(
      `📈 İstatistikler:
🖥️ Sunucu: ${os.hostname()}
🧠 RAM Kullanımı: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
💾 Toplam RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
📦 Versiyon: v${package.version}
⚙️ Node.js: ${process.version}`
    );
  }
};
