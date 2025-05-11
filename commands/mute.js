module.exports = {
    name: "mute",
    description: "Bir kullanıcıyı susturur (rol sistemi gerektirir).",
    async execute(message, args) {
      const member = message.mentions.members.first();
      if (!member) return message.reply("Susturulacak kullanıcıyı etiketle.");
      const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
      if (!muteRole) return message.reply("🔇 'Muted' adında bir rol yok.");
      await member.roles.add(muteRole);
      message.reply(`🔇 ${member.user.tag} susturuldu.`);
    }
  };
  