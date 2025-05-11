module.exports = {
    name: "unban",
    description: "Bir kullanıcının yasaklamasını kaldırır.",
    async execute(message, args) {
      // Kullanıcının 'BanMembers' iznine sahip olup olmadığını kontrol et
      if (!message.member.permissions.has("BanMembers")) {
        return message.reply("⛔ Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısınız.");
      }
  
      // Yasaklanan kullanıcıyı ID ile al
      const userId = args[0];
      if (!userId) {
        return message.reply("❗ Yasaklaması kaldırılacak kullanıcının ID'sini girin.");
      }
  
      try {
        // Yasaklanan kullanıcıyı bulmaya çalış
        const bannedUser = await message.guild.bans.fetch(userId);
        if (!bannedUser) {
          return message.reply("❗ Böyle bir yasaklı kullanıcı bulunamadı.");
        }
  
        // Kullanıcıyı unban et
        await message.guild.members.unban(userId);
  
        // Embed mesajıyla unban başarılı
        message.reply({
          embeds: [{
            color: 0x00FF00,  // Yeşil renk
            title: "Yasaklama Kaldırıldı!",
            description: `${bannedUser.user.tag} adlı kullanıcının yasaklaması başarıyla kaldırıldı.`,
            fields: [
              { name: "Yasaklanan Kullanıcı", value: `${bannedUser.user.tag}`, inline: true },
            ],
            footer: { text: `Yasaklamayı Kaldıran: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
            timestamp: new Date(),
          }]
        });
      } catch (error) {
        console.error(error);
        message.reply("❌ Yasaklamayı kaldırma işlemi sırasında bir hata oluştu.");
      }
    }
  };
  