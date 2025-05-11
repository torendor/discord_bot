module.exports = {
    name: "poll",
    description: "Anket başlatır.",
    async execute(message, args) {
      const question = args.join(" ");
      if (!question) return message.reply("❓ Anket sorusunu yazmalısın.");
      const pollMessage = await message.channel.send(`📊 Anket: ${question}`);
      await pollMessage.react("👍");
      await pollMessage.react("👎");
    }
  };
  