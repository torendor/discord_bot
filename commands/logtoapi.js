const axios = require("axios");

module.exports = {
  name: "logtoapi",
  description: "Bir mesajı web sitene API üzerinden loglar.",
  async execute(message, args) {
    const log = args.join(" ");
    if (!log) return message.reply("Log içeriğini girmelisin.");

    try {
      await axios.post("https://seninsite.com/api/log.php", {
        user: message.author.username,
        message: log,
        time: new Date().toISOString(),
        server: message.guild.name
      });

      message.reply("✅ Log başarıyla siteye gönderildi.");
    } catch (err) {
      console.error(err);
      message.reply("❌ Log gönderilirken hata oluştu.");
    }
  }
};
