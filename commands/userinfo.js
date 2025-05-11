module.exports = {
  name: "userinfo",
  description: "Kullanıcı bilgilerini detaylı olarak gösterir.",
  async execute(message, args) {
    // Etiketlenen kullanıcıyı al ya da komutu kullanan kişiyi al
    const user = message.mentions.users.first() || message.author;
    const member = message.guild.members.cache.get(user.id);

    // Kullanıcı bilgilerini al
    const userInfo = {
      username: user.tag,
      id: user.id,
      createdAt: user.createdAt.toDateString(),
      joinedAt: member.joinedAt.toDateString(),
      roles: member.roles.cache.map(role => role.name).join(", "),
      status: user.presence?.status || "Bilinmiyor",
      avatar: user.displayAvatarURL({ dynamic: true, size: 512 }),
    };

    // Kullanıcı bilgilerini embed ile görsel hale getirme
    const userInfoEmbed = {
      color: 0x00FF00,
      title: `👤 ${userInfo.username} Bilgileri`,
      thumbnail: { url: userInfo.avatar },
      fields: [
        { name: "Kullanıcı Adı", value: userInfo.username, inline: true },
        { name: "Kullanıcı ID", value: userInfo.id, inline: true },
        { name: "Hesap Oluşturulma Tarihi", value: userInfo.createdAt, inline: true },
        { name: "Sunucuya Katılma Tarihi", value: userInfo.joinedAt, inline: true },
        { name: "Aktif Durum", value: userInfo.status, inline: true },
        { name: "Roller", value: userInfo.roles || "Hiç bir rolü yok", inline: true }
      ],
      footer: {
        text: `Komutu kullanan: ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL(),
      },
      timestamp: new Date(),
    };

    // Embed mesajı gönder
    message.reply({ embeds: [userInfoEmbed] });
  }
};
