exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  await message.reply("Reboot en cours ...");
  await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
  ));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Stop le bot.",
  usage: "reboot"
};