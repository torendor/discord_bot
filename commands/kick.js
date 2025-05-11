module.exports = {
  name: "kick",
  description: "Bir kullanıcıyı sunucudan atar.",
  async execute(message, args) {
    // Kullanıcının yeterli izne sahip olup olmadığını kontrol et
    if (!message.member.permissions.has("KickMembers")) {
      return message.reply("⛔ Bu komutu kullanamazsın.");
    }

    // Atılacak kullanıcıyı etiketleyip etiketlemediğini kontrol et
    const user = message.mentions.members.first();
    if (!user) {
      return message.reply("Atılacak kullanıcıyı etiketle.");
    }

    // Kullanıcının sunucudan atılabilir olup olmadığını kontrol et
    if (!user.kickable) {
      return message.reply("⛔ Bu kullanıcıyı atamıyorum.");
    }

    // Kullanıcıyı at
    try {
      await user.kick();
      message.reply({
        embeds: [{
          color: 0xFF0000,  // Kırmızı renk
          title: `👢 ${user.user.tag} atıldı.`,
          description: `${user.user.tag}, sunucudan başarıyla atıldı.`,
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (error) {
      console.error(error);
      message.reply("⛔ Bir hata oluştu, kullanıcıyı atamadım.");
    }
  }
};
