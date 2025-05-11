module.exports = {
    name: "giveaway",
    description: "Basit çekiliş başlatır.",
    async execute(message, args) {
      const prize = args.join(" ");
      if (!prize) return message.reply("🎁 Ödülü belirtmelisin.");
      const giveawayMsg = await message.channel.send(`🎉 Çekiliş Başladı! Ödül: **${prize}**\nKatılmak için 🎉 tepkisine basın!`);
      await giveawayMsg.react("🎉");
  
      setTimeout(async () => {
        const fetchedMsg = await message.channel.messages.fetch(giveawayMsg.id);
        const users = await fetchedMsg.reactions.cache.get("🎉").users.fetch();
        const validUsers = users.filter(u => !u.bot).map(u => u);
        if (validUsers.length === 0) return message.channel.send("😕 Katılan yok.");
        const winner = validUsers[Math.floor(Math.random() * validUsers.length)];
        message.channel.send(`🎊 Tebrikler ${winner}, **${prize}** kazandın!`);
      }, 15000); // 15 saniye sonra bitir
    }
  };
  