exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args || args.length < 1) return message.reply("Aucune commande n'a été trouver");
  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`Erreur: ${response}`);

  response = client.loadCommand(command.help.name);
  if (response) return message.reply(`Erreur: ${response}`);

  message.reply(`La commande \`${command.help.name}\` viens d'etre reload`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Relaod une commande.",
  usage: "reload [command]"
};