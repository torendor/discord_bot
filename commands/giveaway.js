module.exports = {
  name: "giveaway",
  description: "Bir çekiliş başlatır. Katılmak için belirtilen tepkilerle katılım yapılabilir.",
  async execute(message, args) {
    // Çekiliş için ödül ve süre al
    const prize = args[0];
    const time = args[1];

    if (!prize) return message.reply("🎁 Çekiliş ödülünü belirtmelisin.");
    if (!time || isNaN(time)) return message.reply("⏳ Çekiliş süresi geçerli bir sayı olmalı (milisaniye).");

    // Çekiliş mesajı
    const giveawayMsg = await message.channel.send(`🎉 Çekiliş Başladı! Ödül: **${prize}**\nKatılmak için 🎉 tepkisine basın!\nÇekiliş Süresi: **${time / 1000} saniye**`);

    // Çekilişe katılmak için tepki ekle
    await giveawayMsg.react("🎉");

    // Çekilişin bitmesini bekle
    setTimeout(async () => {
      const fetchedMsg = await message.channel.messages.fetch(giveawayMsg.id);
      const users = await fetchedMsg.reactions.cache.get("🎉").users.fetch();
      const validUsers = users.filter(u => !u.bot).map(u => u);

      // Geçerli katılımcı yoksa mesaj gönder
      if (validUsers.length === 0) {
        return message.channel.send(`😕 Katılan kimse yok, çekiliş iptal edildi.`);
      }

      // Kazananı seç
      const winner = validUsers[Math.floor(Math.random() * validUsers.length)];

      // Embed mesajı ile kazananı duyur
      message.channel.send({
        embeds: [{
          color: 0x00FF00,  // Yeşil renk kazananı vurgulamak için
          title: "Çekiliş Sonucu",
          description: `🎉 Tebrikler ${winner}, **${prize}** kazandın!`,
          fields: [
            { name: "Katılımcı Sayısı", value: `${validUsers.length} kişi katıldı.`, inline: true },
            { name: "Ödül", value: `${prize}`, inline: true },
          ],
          footer: { text: `Çekiliş Başlatan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    }, time); // Çekiliş süresi bitişi
  }
};
