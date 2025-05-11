module.exports = {
  name: "register",
  description: "Bir kullanıcıyı kayıt eder (rol verir ve adını değiştirir).",
  async execute(message, args) {
    // Yönetici izin kontrolü
    if (!message.member.permissions.has("MANAGE_ROLES")) {
      return message.reply("⛔ Bu komutu kullanmak için yeterli yetkin yok.");
    }

    // Etiketlenen kullanıcıyı ve yeni ismi al
    const member = message.mentions.members.first();
    const name = args.slice(1).join(" ");
    
    // "Üye" rolünü sunucuda bul
    const role = message.guild.roles.cache.find(r => r.name === "Üye");

    // Kullanıcı, isim ve rol kontrolü
    if (!member || !name || !role) {
      return message.reply("❗ Lütfen bir kullanıcı etiketle ve ismini gir. Ayrıca, sunucuda 'Üye' rolünün bulunduğundan emin ol.");
    }

    // Kullanıcının ismini değiştirme ve role ekleme
    try {
      await member.setNickname(name);
      await member.roles.add(role);

      message.reply({
        embeds: [{
          color: 0x00FF00,  // Yeşil renk
          title: "✅ Kayıt Başarılı",
          description: `${member.user.tag} başarıyla "${name}" olarak kayıt edildi ve "Üye" rolü verildi.`,
          fields: [
            { name: "Kullanıcı", value: member.user.tag, inline: true },
            { name: "Yeni İsim", value: name, inline: true },
            { name: "Rol", value: "Üye", inline: true },
          ],
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (err) {
      console.error(err);
      message.reply("❌ Kayıt işlemi sırasında bir hata oluştu.");
    }
  }
};
