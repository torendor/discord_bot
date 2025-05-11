module.exports = {
  name: "poll",
  description: "Anket başlatır.",
  async execute(message, args) {
    // Anket sorusunun boş olup olmadığını kontrol et
    const question = args.join(" ");
    if (!question) {
      return message.reply("❓ Anket sorusunu yazmalısın.");
    }

    // Anketin başlatılacağı mesajı oluştur
    try {
      const pollEmbed = {
        color: 0x00FF00,  // Yeşil renk
        title: "📊 Anket Başlatıldı!",
        description: `**Soru:** ${question}`,
        fields: [
          { name: "👍 Evet", value: "Bu ankete katılmak için bu emojiyi tıklayın.", inline: true },
          { name: "👎 Hayır", value: "Bu ankete katılmak için bu emojiyi tıklayın.", inline: true },
        ],
        footer: { text: `Komutu kullanan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
        timestamp: new Date(),
      };

      const pollMessage = await message.channel.send({ embeds: [pollEmbed] });

      // Anket için tepki emojilerini ekle
      await pollMessage.react("👍");
      await pollMessage.react("👎");

      message.reply("✅ Anket başarıyla başlatıldı!");
    } catch (err) {
      console.error(err);
      message.reply("❌ Anket başlatılırken bir hata oluştu.");
    }
  }
};
