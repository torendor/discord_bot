const fs = require("fs");
const path = "./autorole.json";

module.exports = {
  name: "autorole",
  description: "Sunucuya katılan üyelere otomatik rol atar.",
  execute(message, args) {
    // Kullanıcının gerekli izne sahip olup olmadığını kontrol et
    if (!message.member.permissions.has("ManageGuild")) {
      return message.reply("⛔ Bu komutu kullanabilmek için **Sunucuyu Yönet** iznine sahip olmalısınız.");
    }

    // Rol etiketlendi mi kontrol et
    const role = message.mentions.roles.first();
    if (!role) {
      return message.reply("❗ Lütfen bir rol etiketleyin.");
    }

    // Rolü veritabanına kaydet
    fs.writeFileSync(path, JSON.stringify({ role: role.id }));

    // Kullanıcıya başarılı bir şekilde rol atandığını bildir
    message.channel.send(`✅ **Otomatik Rol** başarıyla ayarlandı: ${role.name}`);
    
    // Yöneticiye bilgi mesajı
    message.reply(`🔧 **Oto-Rol Sistemi** aktif hale getirildi! Yeni katılan üyeler, **${role.name}** rolünü alacak.`);
  }
};
