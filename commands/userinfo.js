module.exports = {
    name: "userinfo",
    description: "Kullanıcı bilgilerini gösterir.",
    execute(message, args) {
      const user = message.mentions.users.first() || message.author;
      message.reply(`👤 Kullanıcı: ${user.tag}\n🆔 ID: ${user.id}\n📆 Oluşturulma: ${user.createdAt.toDateString()}`);
    }
  };
  