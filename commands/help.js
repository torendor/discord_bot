const fs = require("fs");
const path = require("path");

module.exports = {
  name: "help",
  description: "Tüm komutları listeler veya belirli bir komut hakkında bilgi verir.",
  execute(message, args) {
    // Komut dosyalarının bulunduğu dizin
    const commandFiles = fs.readdirSync(path.join(__dirname, "..", "commands")).filter(file => file.endsWith(".js"));

    // Eğer belirli bir komut adı verilirse
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const commandFile = commandFiles.find(file => file.toLowerCase().includes(commandName));
      
      if (!commandFile) {
        return message.reply("❗ Geçerli bir komut bulamadım. Yardım almak için geçerli komutları yazın.");
      }
      
      // Komut dosyasını al
      const command = require(`./${commandFile}`);
      
      // Komut hakkında detaylı bilgi ver
      message.reply({
        embeds: [{
          color: 0x00FF00,  // Yeşil renk
          title: `Komut: ${command.name}`,
          description: `${command.description}`,
          fields: [
            { name: "Kullanım", value: `!${command.name} ${command.usage || ''}`, inline: true },
            { name: "Açıklama", value: `${command.description}`, inline: true }
          ],
          footer: { text: `Yardım komutunu başlatan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
          timestamp: new Date(),
        }]
      });
      return;
    }
    
    // Tüm komutları listele
    const categories = {};  // Kategorileri tutacak obje

    // Komutları kategoriye göre ayırmak için
    commandFiles.forEach(file => {
      const command = require(`./${file}`);
      const category = command.category || "Diğer";  // Kategorisi olmayanları 'Diğer' altında topla

      if (!categories[category]) categories[category] = [];
      categories[category].push(command);
    });

    // Embed mesaj ile komutları göster
    let helpMessage = "📚 Komutlar:\n";
    
    Object.keys(categories).forEach(category => {
      helpMessage += `\n**${category}:**\n`;
      categories[category].forEach(command => {
        helpMessage += `🔹 !${command.name} - ${command.description}\n`;
      });
    });

    message.reply({
      embeds: [{
        color: 0x00FF00,  // Yeşil renk
        title: "Yardım Komutları",
        description: helpMessage,
        footer: { text: `Yardım komutunu başlatan: ${message.author.tag}`, icon_url: message.author.displayAvatarURL() },
        timestamp: new Date(),
      }]
    });
  }
};
