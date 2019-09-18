exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Tes permissions sont ${level} - **${friendly}**`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Utilisateur"
};

exports.help = {
  name: "level",
  category: "Miscelaneous",
  description: "Hum, Quel sont tes permissions ?",
  usage: "level"
};
