module.exports = {
  name: "avatar",
  description: "Belirtilen kullanıcının avatarını gösterir.",
  execute(message, args) {
    // Komutla etiketlenen kullanıcıyı al (ya da mesajı atan kullanıcıyı kullan)
    const user = message.mentions.users.first() || message.author;

    // Avatarın URL'sini al ve mesajı daha açıklayıcı hale getir
    const avatarURL = user.displayAvatarURL({ dynamic: true, size: 512 });

    // Kullanıcıya avatarı ve açıklamayı gönder
    message.reply({
      content: `${user.username} adlı kullanıcının avatarı:`,
      embeds: [{
        color: 0x7289DA,  // Discord mavi rengi
        title: `${user.username} Avatarı`,
        image: { url: avatarURL },
        description: `[Avatarı tam boyutta görmek için tıklayın](${avatarURL})`
      }]
    });
  }
};
