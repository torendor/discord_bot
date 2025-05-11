const fs = require("fs");

module.exports = {
  name: "logsetup",
  description: "Log kanalını ayarlar.",
  execute(message, args) {
    // Yeterli iznin olup olmadığını kontrol et
    if (!message.member.permissions.has("ManageGuild")) {
      return message.reply("⛔ Bu komutu kullanmak için yeterli yetkin yok.");
    }

    // Etiketlenen kanal olup olmadığını kontrol et
    const channel = message.mentions.channels.first();
    if (!channel) {
      return message.reply("❗ Log kanalını etiketlemelisin.");
    }

    // Kanalın text kanal olması gerektiğini kontrol et
    if (channel.type !== "GUILD_TEXT") {
      return message.reply("❗ Log kanalı sadece bir metin kanalı olmalıdır.");
    }

    // Log kanalını kaydet
    try {
      fs.writeFileSync("./logchannel.json", JSON.stringify({ id: channel.id }));
      message.reply({
        embeds: [{
          color: 0x00FF00,  // Yeşil renk
          title: "Log Kanalı Ayarlandı",
          description: `📁 Log kanalı başarıyla ayarlandı: ${channel.name}`,
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (error) {
      console.error(error);
      message.reply("⛔ Log kanalı ayarlanırken bir hata oluştu.");
    }
  }
};
