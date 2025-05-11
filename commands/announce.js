module.exports = {
    name: "announce",
    description: "Duyuru yapar.",
    execute(message, args) {
      if (!message.member.permissions.has("ManageMessages")) return message.reply("⛔ Bu komutu kullanamazsın.");
      const announcement = args.join(" ");
      if (!announcement) return message.reply("Yapılacak duyuruyu yaz.");
      message.channel.send(`📢 DUYURU: ${announcement}`);
    }
  };
  