exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("Ping?");
  msg.edit(`Pong! Latence du bot ${new Date().getTime() - message.createdTimestamp}ms. Latence de l'API ${Math.round(client.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pong", "latence", "pinj"],
  permLevel: "Utilisateur"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "Pong",
  usage: "ping"
};
