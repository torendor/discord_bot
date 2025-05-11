module.exports = {
    name: "suggest",
    description: "Öneri gönderir.",
    async execute(message, args) {
      const suggestion = args.join(" ");
      if (!suggestion) return message.reply("Önerini yazmalısın.");
      const msg = await message.channel.send(`💡 **Öneri:** ${suggestion}\n👤 Gönderen: ${message.author}`);
      await msg.react("👍");
      await msg.react("👎");
    }
  };
  