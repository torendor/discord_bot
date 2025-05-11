module.exports = {
  name: "serverinfo",
  description: "Sunucu bilgilerini gösterir.",
  async execute(message, args) {
    const { guild } = message;

    // Sunucu bilgilerini al
    const owner = await guild.fetchOwner();
    const creationDate = guild.createdAt.toDateString();
    const region = guild.preferredLocale;
    const verificationLevel = guild.verificationLevel;
    const boosts = guild.premiumSubscriptionCount;
    const icon = guild.iconURL({ dynamic: true, size: 512 });

    // Embed mesaj oluştur
    const serverInfoEmbed = {
      color: 0x00FF00,  // Yeşil renk
      title: `📛 ${guild.name} Sunucu Bilgisi`,
      thumbnail: { url: icon },
      fields: [
        { name: "Sunucu Adı", value: guild.name, inline: true },
        { name: "Sunucu ID", value: guild.id, inline: true },
        { name: "Sunucu Sahibi", value: owner.user.tag, inline: true },
        { name: "Üye Sayısı", value: `${guild.memberCount} üye`, inline: true },
        { name: "Bölge", value: region, inline: true },
        { name: "Doğrulama Seviyesi", value: verificationLevel, inline: true },
        { name: "Booster Sayısı", value: `${boosts} boost`, inline: true },
        { name: "Sunucu Kuruluş Tarihi", value: creationDate, inline: true },
      ],
      footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
      timestamp: new Date(),
    };

    // Sunucu bilgilerini embed ile gönder
    message.reply({ embeds: [serverInfoEmbed] });
  }
};
