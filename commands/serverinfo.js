module.exports = {
    name: "serverinfo",
    description: "Sunucu bilgilerini gösterir.",
    execute(message, args) {
      const { guild } = message;
      message.reply(`📛 Sunucu Adı: ${guild.name}\n🆔 ID: ${guild.id}\n👥 Üye Sayısı: ${guild.memberCount}`);
    }
  };
  