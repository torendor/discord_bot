module.exports = {
    name: "kick",
    description: "Bir kullanıcıyı sunucudan atar.",
    async execute(message, args) {
      if (!message.member.permissions.has("KickMembers")) return message.reply("⛔ Bu komutu kullanamazsın.");
      const user = message.mentions.members.first();
      if (!user) return message.reply("Atılacak kullanıcıyı etiketle.");
      await user.kick();
      message.reply(`👢 ${user.user.tag} atıldı.`);
    }
  };
  