module.exports = {
  name: "mute",
  description: "Bir kullanıcıyı susturur (rol sistemi gerektirir).",
  async execute(message, args) {
    // Yeterli iznin olup olmadığını kontrol et
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.reply("⛔ Bu komutu kullanmak için yeterli yetkin yok.");
    }

    // Etiketlenen kullanıcıyı al
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("❗ Susturulacak kullanıcıyı etiketlemelisin.");
    }

    // Kullanıcının zaten susturulup susturulmadığını kontrol et
    if (member.roles.cache.some(role => role.name === "Muted")) {
      return message.reply("❗ Bu kullanıcı zaten susturulmuş.");
    }

    // 'Muted' rolünün var olup olmadığını kontrol et
    const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
    if (!muteRole) {
      return message.reply("🔇 'Muted' adında bir rol yok.");
    }

    // Kullanıcıya 'Muted' rolünü ekle
    try {
      await member.roles.add(muteRole);
      message.reply({
        embeds: [{
          color: 0xFFFF00,  // Sarı renk
          title: "🔇 Kullanıcı Susturuldu",
          description: `${member.user.tag} başarıyla susturuldu.`,
          fields: [
            { name: "Kullanıcı", value: member.user.tag, inline: true },
            { name: "Susturulma Zamanı", value: new Date().toISOString(), inline: true }
          ],
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (err) {
      console.error(err);
      message.reply("❌ Bir hata oluştu, kullanıcıyı susturamadım.");
    }
  }
};
