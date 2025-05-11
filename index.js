const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

const prefix = "!"; // Komut ön ekin burada

// Komutları yükle
client.commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Komutları dinle
client.on("messageCreate", async message => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("❌ Komut çalıştırılırken bir hata oluştu.");
  }
});

// Oto-rol sistemi (guildMemberAdd)
client.on("guildMemberAdd", member => {
  if (!fs.existsSync("./autorole.json")) return;
  const data = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
  const role = member.guild.roles.cache.get(data.role);
  if (role) {
    member.roles.add(role).catch(console.error);
  }
});

// Mesaj silme loglama
client.on("messageDelete", msg => {
  if (!fs.existsSync("./logchannel.json")) return;
  const data = JSON.parse(fs.readFileSync("./logchannel.json", "utf8"));
  const logChannel = msg.guild.channels.cache.get(data.id);
  if (logChannel) {
    logChannel.send(`🗑️ **Silinen Mesaj:** "${msg.content}" (Gönderen: ${msg.author})`);
  }
});

// Bot açılınca
client.once("ready", () => {
  console.log(`✅ Bot aktif: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

