module.exports = {
    name: "premium",
    description: "Premium üyelik sistemine örnek.",
    execute(message, args) {
      const premiumUsers = ["KULLANICI_ID_1", "KULLANICI_ID_2"];
      if (!premiumUsers.includes(message.author.id)) {
        return message.reply("❌ Premium üye değilsin.");
      }
      message.reply("⭐ Premium komutunu kullandın!");
    }
  };
  