module.exports = {
  name: "premium",
  description: "Premium üyelik sistemine örnek.",
  async execute(message, args) {
    // Premium kullanıcılar listesi
    const premiumUsers = ["KULLANICI_ID_1", "KULLANICI_ID_2"];
    
    // Kullanıcının premium olup olmadığını kontrol et
    if (!premiumUsers.includes(message.author.id)) {
      return message.reply("❌ Premium üye değilsin.");
    }

    // Etiketlenen kullanıcıyı al
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("❗ Premium rolünü vermek için bir kullanıcı etiketlemelisin.");
    }

    // Sunucuda 'Premium' rolünün var olup olmadığını kontrol et
    const premiumRole = message.guild.roles.cache.find(role => role.name === "Premium");
    if (!premiumRole) {
      return message.reply("❗ 'Premium' adında bir rol bulunamadı. Rolün mevcut olduğundan emin olun.");
    }

    // Premium rolünü kullanıcıya ekle
    try {
      await member.roles.add(premiumRole);
      message.reply({
        embeds: [{
          color: 0xFFD700,  // Altın renk
          title: "⭐ Premium Rolü Verildi",
          description: `${member.user.tag} kullanıcısına Premium rolü başarıyla verildi.`,
          fields: [
            { name: "Kullanıcı", value: member.user.tag, inline: true },
            { name: "Rol", value: "Premium", inline: true }
          ],
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (err) {
      console.error(err);
      message.reply("❌ Premium rolü verilirken bir hata oluştu.");
    }
  }
};
