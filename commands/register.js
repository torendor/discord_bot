module.exports = {
    name: "register",
    description: "Bir kullanıcıyı kayıt eder (rol verir ve adını değiştirir).",
    async execute(message, args) {
      if (!message.member.permissions.has("ManageRoles")) return message.reply("⛔ Yetkin yok.");
      const member = message.mentions.members.first();
      const name = args.slice(1).join(" ");
      const role = message.guild.roles.cache.find(r => r.name === "Üye"); // "Üye" adında rol olmalı
  
      if (!member || !name || !role) return message.reply("Kullanıcıyı etiketle ve adını gir.");
  
      await member.setNickname(name);
      await member.roles.add(role);
      message.channel.send(`✅ ${member} başarıyla "${name}" olarak kayıt edildi ve rol verildi.`);
    }
  };
  