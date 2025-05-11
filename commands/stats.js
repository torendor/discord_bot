const os = require("os");
const { Client } = require("discord.js");
const package = require("../package.json");

module.exports = {
  name: "stats",
  description: "Botun sistem istatistiklerini ve kullanıcının aktif durum bilgilerini gösterir.",
  async execute(message, args) {
    const bot = message.client;
    const member = message.guild.members.cache.get(message.author.id);

    // Kullanıcının sesli kanalda olup olmadığını kontrol et
    const voiceChannel = member.voice.channel ? member.voice.channel.name : "Sesli kanalda değil";

    // Kullanıcının mesaj sayısını hesapla (bu veriyi sunucuya göre filtrelemen gerekebilir)
    const messageCount = message.guild.messages.cache.filter(msg => msg.author.id === message.author.id).size;

    // Botun istatistikleri
    const botStats = {
      server: os.hostname(),
      ramUsage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), // MB
      totalRam: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), // GB
      version: package.version,
      nodeVersion: process.version,
      uptime: (bot.uptime / 1000 / 60 / 60).toFixed(2), // Saat cinsinden
      totalUsers: bot.users.cache.size,
      totalGuilds: bot.guilds.cache.size,
    };

    // Kullanıcı istatistikleri
    const userStats = {
      voiceStatus: voiceChannel,
      messageCount: messageCount,
      joinedAt: member.joinedAt.toDateString(),
      roles: member.roles.cache.size
    };

    // Embed oluşturuluyor
    const statsEmbed = {
      color: 0x00FF00,
      title: "📊 Bot ve Kullanıcı İstatistikleri",
      fields: [
        {
          name: "🖥️ Bot İstatistikleri",
          value: `
            Sunucu: ${botStats.server}
            RAM Kullanımı: ${botStats.ramUsage} MB
            Toplam RAM: ${botStats.totalRam} GB
            Versiyon: v${botStats.version}
            Node.js Versiyonu: ${botStats.nodeVersion}
            Uptime: ${botStats.uptime} saat
            Kullanıcı Sayısı: ${botStats.totalUsers}
            Sunucu Sayısı: ${botStats.totalGuilds}
          `
        },
        {
          name: "👤 Kullanıcı İstatistikleri",
          value: `
            Sesli Kanaldaki Durum: ${userStats.voiceStatus}
            Toplam Mesaj Sayısı: ${userStats.messageCount}
            Katılım Tarihi: ${userStats.joinedAt}
            Rol Sayısı: ${userStats.roles}
          `
        }
      ],
      footer: {
        text: `Komutu kullanan: ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL(),
      },
      timestamp: new Date(),
    };

    // Embed mesajı gönder
    message.reply({ embeds: [statsEmbed] });
  }
};
