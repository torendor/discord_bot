module.exports = {
  name: "vote",
  description: "Belirtilen konuda oylama başlatır.",
  async execute(message, args) {
    // Oylama sorusu alınıyor
    const question = args.slice(0, -1).join(" "); // Son kelimeyi süre olarak alacağız
    const duration = parseInt(args[args.length - 1]); // Oylama süresi (saniye olarak)

    if (!question) return message.reply("❌ Oylama sorusunu yazmalısınız.");
    if (!duration || isNaN(duration)) return message.reply("❌ Lütfen geçerli bir süre (saniye cinsinden) girin.");

    // Oylama başlatılıyor
    const voteMsg = await message.channel.send(`🗳️ **Oylama Başladı:** ${question}\n⏳ Oylama süresi: ${duration} saniye.`);
    
    // Oylama seçenekleri ekleniyor
    await voteMsg.react("✅");
    await voteMsg.react("❌");

    // Oylama süresi bitince sonuçları gönder
    setTimeout(async () => {
      // Oylama sonuçlarını al
      const reactions = voteMsg.reactions.cache;
      const yesVotes = reactions.get("✅") ? reactions.get("✅").count - 1 : 0; // 1 kişi bot olduğu için onu çıkarıyoruz
      const noVotes = reactions.get("❌") ? reactions.get("❌").count - 1 : 0; // Aynı şekilde botu çıkarıyoruz

      // Sonuçları mesaj olarak gönder
      await message.channel.send(`🗳️ Oylama Sonuçları:
✅ Evet: ${yesVotes} oy
❌ Hayır: ${noVotes} oy`);
    }, duration * 1000); // Süreyi milisaniye cinsine çeviriyoruz
  }
};
