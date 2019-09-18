const Discord = require('discord.js')
const moment = require('moment')

exports.run = async ( client, message, [action, key, ...value], level) => { 
 
message.reply(moment().startOf('day').fromNow('3'))
  
 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["test", "inDev"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "dev",
  category: "System",
  description: "./commands/dev.js",
  usage: "dev"
};
