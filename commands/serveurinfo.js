const Discord = require("discord.js");
const moment = require("moment");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  /*message.channel.send(`= STATS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Serveurs   :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}`, {code: "asciidoc"});*/
  
  let totalVoc = message.guild.channels.filter(channel => channel.type == "voice").size;
  
function count(totalVoc) {
                if (totalVoc == "0") return 'Aucun';
                if (totalVoc == "1") return '1 Salon vocal';
                return `${totalVoc} Salon vocaux`

            }
  
  message.channel.send(`= Serveur Info =
[Général]

• Nom        :: ${message.guild.name}
• ID         :: ${message.guild.id}
• Owner      :: ${client.users.get(message.guild.ownerID).tag} (ID: ${message.guild.ownerID})
• Création   :: ${moment.utc(message.guild.createdAt).format("DD/MM/YYYY")}
• Users      :: ${message.guild.memberCount} Utilisateurs
• Emojis     :: ${message.guild.emojis.size} Emojis
• Roles      :: ${message.guild.roles.size} Roles
• Salons     :: ${message.guild.channels.size} Salons

[Avancé]

• Bots       :: ${message.guild.members.filter(member => member.user.bot).size} Bots
• Humain     :: ${message.guild.members.filter(member => !member.user.bot).size} Utilisateurs
• Vocaux     :: ${count(totalVoc)}
• Textuel    :: ${message.guild.channels.filter(channel => channel.type == "text").size} Salon textuel
• Catégories :: ${message.guild.channels.filter(channel => channel.type == "category").size} Catégories

[Personalisable]

• Desciption :: ${message.settings.serveurDesc}
• Prefix     :: ${message.settings.prefix}

`,{code: "asciidoc"})
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["si", "infoserv", "serveur"],
  permLevel: "Utilisateur"
};

exports.help = {
  name: "serveurinfo",
  category: "Informations",
  description: "Affiche les informations a propos du serveur.",
  usage: "stats"
};
