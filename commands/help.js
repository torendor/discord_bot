const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Tüm komutları listeler.",
  execute(message, args) {
    const commandFiles = fs.readdirSync(path.join(__dirname)).filter(file => file.endsWith(".js"));
    const commands = commandFiles.map(file => `🔹 ${file.replace(".js", "")}`).join("\n");
    message.reply(`📚 Komutlar:\n${commands}`);
  }
};
