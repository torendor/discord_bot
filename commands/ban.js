module.exports = {
    name: "ban",
    description: "Bir kullanıcıyı yasaklar.",
    async execute(message, args) {
      if (!message.member.permissions.has("BanMembers")) return message.reply("⛔ Bu komutu kullanamazsın.");
      const user = message.mentions.members.first();
      if (!user) return message.reply("Yasaklanacak kullanıcıyı etiketle.");
      await user.ban();
      message.reply(`🚫 ${user.user.tag} yasaklandı.`);
    }
  };
  