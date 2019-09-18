const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [jrs], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATS =
[Général]
• Dev            :: ${client.users.get("363427986478727169").tag} (ID: ${client.users.get("363427986478727169").id})
• Nom            :: ${client.user.tag} ( ID: ${client.user.id})
• Stockage       :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime         :: ${duration}
• Commands       :: ${client.commands.size} Commands
• Total Users    :: ${client.users.size} Users
• Total Channel  :: ${client.channels.size} Channels

[Avancé]

• Utilisateurs   :: ${client.users.filter(u =>! u.bot).size}
• Bot            :: ${client.users.filter(u => u.bot).size}
• Serveurs       :: ${client.guilds.size.toLocaleString()}
• Channels       :: ${client.channels.size.toLocaleString()}
• Textuel        :: ${client.channels.filter(c => c.type == "text").size} Salon textuel
• Vocaux         :: ${client.channels.filter(c => c.type == "voice").size} Salon Vocaux
• Catégories     :: ${client.channels.filter(c => c.type == "category").size} Catégories

[Settings]

• Prefix         :: ${client.settings.get("default").prefix}

[Versions]

• Discord.js     :: v${version}
• Node           :: ${process.version}
• Bot            :: ${client.settings.get("default").version}`, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["clientinfo","bi"],
  permLevel: "Utilisateur"
};

exports.help = {
  name: "botinfo",
  category: "Informations",
  description: "Donne un max d'info sur moi.",
  usage: "botinfo"
};