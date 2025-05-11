module.exports = {
    name: "vote",
    description: "Belirtilen konuda oylama başlatır.",
    async execute(message, args) {
      const question = args.join(" ");
      if (!question) return message.reply("Oylama sorusunu yaz.");
      const voteMsg = await message.channel.send(`🗳️ **Oylama:** ${question}`);
      await voteMsg.react("✅");
      await voteMsg.react("❌");
    }
  };
  