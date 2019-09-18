const Discord = require('discord.js')
const moment = require('moment')
const arcadiaapi = require('arcadia-module')

exports.run = async ( client, message, [action, key, ...value], level) => { 
 
  arcadiaapi.generation("bob", `${ message.author.avatarURL}`).then(url => {
  message.reply(url)
})

 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["test", "inDev"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "bob",
  category: "Image",
  description: "Bob",
  usage: "bob"
};
