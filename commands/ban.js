module.exports = {
  name: "ban",
  description: "Belirtilen kullanıcıyı sunucudan yasaklar.",
  async execute(message, args) {
    // Kullanıcının 'BanMembers' iznine sahip olup olmadığını kontrol et
    if (!message.member.permissions.has("BanMembers")) {
      return message.reply("⛔ Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısınız.");
    }

    // Yasaklanacak kullanıcıyı etiketle
    const user = message.mentions.members.first();
    if (!user) {
      return message.reply("❗ Yasaklanacak kullanıcıyı etiketlemeniz gerekiyor.");
    }

    // Kendi kendini yasaklayamaz
    if (user.id === message.author.id) {
      return message.reply("❌ Kendini yasaklayamazsın.");
    }

    // Sunucudaki en yüksek rollerin kontrolü
    if (user.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply("⛔ Bu kullanıcıyı yasaklamak için daha yüksek bir role sahip olmalısınız.");
    }

    // Yasaklama nedeni almak
    const reason = args.slice(1).join(" ") || "Sebep belirtilmedi.";  // Eğer neden belirtilmemişse, varsayılan bir mesaj ekleriz

    try {
      // Kullanıcıyı yasakla
      await user.ban({ reason });
      
      // Embed mesajıyla yasaklama başarılı
      message.reply({
        embeds: [{
          color: 0xFF0000,  // Kırmızı renk
          title: "Yasaklama Başarılı!",
          description: `${user.user.tag} başarıyla yasaklandı!`,
          fields: [
            { name: "Yasaklanan Kullanıcı", value: `${user.user.tag}`, inline: true },
            { name: "Yasaklama Nedeni", value: reason, inline: true },
          ],
          footer: { text: `Yasaklayan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    } catch (error) {
      console.error(error);
      message.reply("❌ Yasaklama işlemi sırasında bir hata oluştu.");
    }
  }
};
