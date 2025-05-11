const axios = require("axios");

module.exports = {
  name: "logtoapi",
  description: "Bir mesajı web sitene API üzerinden loglar.",
  async execute(message, args) {
    // Log mesajının boş olup olmadığını kontrol et
    const log = args.join(" ");
    if (!log) {
      return message.reply("❗ Log içeriğini girmelisin.");
    }

    // API URL'sini ve gerekli verileri yapılandır
    const apiUrl = "https://seninsite.com/api/log.php";
    const logData = {
      user: message.author.username,
      message: log,
      time: new Date().toISOString(),
      server: message.guild.name,
    };

    // Log verisini API'ye gönder
    try {
      const response = await axios.post(apiUrl, logData);

      // API yanıtını kontrol et
      if (response.status === 200) {
        message.reply({
          embeds: [{
            color: 0x00FF00,  // Yeşil renk
            title: "✅ Log Başarıyla Gönderildi",
            description: `Log mesajı başarıyla ${message.guild.name} sunucusundan API'ye gönderildi.`,
            fields: [
              { name: "Gönderen", value: message.author.username, inline: true },
              { name: "Mesaj", value: log, inline: true },
              { name: "Zaman", value: new Date().toISOString(), inline: true }
            ],
            footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
            timestamp: new Date(),
          }]
        });
      } else {
        throw new Error("API'ye log gönderilirken beklenmeyen bir hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      message.reply({
        embeds: [{
          color: 0xFF0000,  // Kırmızı renk
          title: "❌ Log Gönderilemedi",
          description: `Log gönderilirken bir hata oluştu. Lütfen tekrar deneyin.`,
          fields: [
            { name: "Hata Detayı", value: err.message, inline: false }
          ],
          footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
    }
  }
};
