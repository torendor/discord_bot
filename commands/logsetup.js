const fs = require("fs");
module.exports = {
  name: "logsetup",
  description: "Log kanalını ayarlar.",
  execute(message, args) {
    if (!message.member.permissions.has("ManageGuild")) return message.reply("Yetkin yok.");
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply("Log kanalı etiketlemelisin.");

    fs.writeFileSync("./logchannel.json", JSON.stringify({ id: channel.id }));
    message.reply(`📁 Log kanalı ayarlandı: ${channel.name}`);
  }
};
