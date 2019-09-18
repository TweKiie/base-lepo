const { inspect } = require("util");

/*
FOR GUILD SETTINGS SEE set.js !
This command is used to modify the bot's default configuration values, which affects all guilds. 
If a default setting is not specifically overwritten by a guild, changing a default here will
change it for that guild. The `add` action adds a key to the configuration of every guild in
your bot. The `del` action removes the key also from every guild, and loses its value forever.
*/

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve Default Values from the default settings in the bot.
  const defaults = client.settings.get("default");
  
  // Adding a new key adds it to every guild (it will be visible to all of them)
  if (action === "add") {
    if (!key) return message.reply("Aucune key n'a été spécifié");
    if (defaults[key]) return message.reply("Cette key exite déja");
    if (value.length < 1) return message.reply("Merci de spécifié une Value");

    // `value` being an array, we need to join it first.
    defaults[key] = value.join(" ");
  
    // One the settings is modified, we write it back to the collection
    client.settings.set("default", defaults);
    message.reply(`${key} a bien été ajouté a ${value.join(" ")}`);
  } else
  
  // Changing the default value of a key only modified it for guilds that did not change it to another value.
  if (action === "set") {
    if (!key) return message.reply("Aucune key n'a été spécifié");
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    if (value.length < 1) return message.reply("Aucune value n'a été spécifié");

    defaults[key] = value.join(" ");

    client.settings.set("default", defaults);
    message.reply(`${key} a bien été modifié en ${value.join(" ")}`);
  } else
  
  // WARNING: DELETING A KEY FROM THE DEFAULTS ALSO REMOVES IT FROM EVERY GUILD
  // MAKE SURE THAT KEY IS REALLY NO LONGER NEEDED!
  if (action === "del") {
    if (!key) return message.reply("Aucune key n'a été spécifié");
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    
    // Throw the 'are you sure?' text at them.
    const response = await client.awaitReply(message, `Cette action est irreversible, **Y** pour confirmer, **N** pour refusé`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response)) {

      // We delete the default `key` here.
      delete defaults[key];
      client.settings.set("default", defaults);
      
      // then we loop on all the guilds and remove this key if it exists.
      // "if it exists" is done with the filter (if the key is present and it's not the default config!)
      for (const [guildid, conf] of client.settings.filter((setting, id) => setting[key] && id !== "default")) {
        delete conf[key];
        client.settings.set(guildid, conf);
      }
      
      message.reply(`${key} was successfully deleted.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("Ouf, tu ne la pas fait :D");
    }
  } else
  
  // Display a key's default value
  if (action === "get") {
    if (!key) return message.reply("Aucune key n'a été spécifié");
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    message.reply(`Le contenue de **${key}** est **${defaults[key]}**`);

  // Display all default settings.
  } else {
    await message.channel.send(`***Bot Default Settings***\n\`\`\`json\n${inspect(defaults)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["defaults"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "conf",
  category: "System",
  description: "Change la config du bot.",
  usage: "conf <view/get/set/reset> <key> <value>"
};
