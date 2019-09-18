const fs = require('fs')

exports.run = async ( client, message, args, level) => { 
  
 if (!args[0])
    return message.reply(
      "Veuillez préciser le nom d'une commande en **.js**. Exemple : l'cmd [fichier]"
    );

  const file = `\`\`${args[0].slice(0, -3)}\`\``;

  try {
    const cmd = fs.readFileSync(`./commands/${args[0]}`);
    await message.channel.send(
      `📥 Voici la commande ${file} !\n\`\`\`js\n${cmd}\n\`\`\``
    );
    message.delete(500);
  } catch (e) {
    message.reply(
      "Une erreur est survenue ! Sois le nom du fichier en .js est incorrect, sois le fichier est trop volumineux, sois la syntaxe est incorrecte !\n **Syntaxe :** l'cmd [fichier.js]"
    );
  }
  
 };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["code", "command"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "cmd",
  category: "System",
  description: "Affiche le contenue de la commande",
  usage: "cmd [fichier.js]"
};
