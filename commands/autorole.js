const fs = require("fs");
const path = "./autorole.json";

module.exports = {
  name: "autorole",
  description: "Girişte verilecek otomatik rolü ayarlar.",
  execute(message, args) {
    if (!message.member.permissions.has("ManageGuild")) return message.reply("⛔ Yetkin yok.");
    const role = message.mentions.roles.first();
    if (!role) return message.reply("Rol etiketlemelisin.");

    fs.writeFileSync(path, JSON.stringify({ role: role.id }));
    message.channel.send(`✅ Oto-rol ayarlandı: ${role.name}`);
  }
};
