module.exports = {
  name: "announce",
  description: "Sunucuda duyuru yapar.",
  execute(message, args) {
      // Kullanıcının gerekli izne sahip olup olmadığını kontrol et
      if (!message.member.permissions.has("ManageMessages")) {
          return message.reply("⛔ Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısınız.");
      }
      
      // Duyuru metnini al
      const announcement = args.join(" ");
      
      // Duyuru metni girilmemişse kullanıcıyı bilgilendir
      if (!announcement) {
          return message.reply("❗ Lütfen yapılacak duyuruyu yazın.");
      }
      
      // Duyuru mesajını gönder
      message.channel.send(`📢 **DUYURU**: ${announcement}`);
      
      // Duyuru başarılıysa kullanıcıyı bilgilendir
      message.reply("✅ Duyuru başarıyla yapıldı.");
  }
};
