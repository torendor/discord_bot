module.exports = {
    name: "avatar",
    description: "Kullanıcının avatarını gösterir.",
    execute(message, args) {
      const user = message.mentions.users.first() || message.author;
      message.reply(user.displayAvatarURL({ dynamic: true, size: 512 }));
    }
  };
  