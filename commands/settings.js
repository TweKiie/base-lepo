
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings (merged) and overrides only.
  const settings = message.settings;
  const defaults = client.settings.get("default");
  const overrides = client.settings.get(message.guild.id);
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
  
  // Edit an existing key value
  if (action === "set" && key == "version" || action === "del"  && key == "version" || action === "reset" && key == "version" ) return message.channel.send('Vous ne pouvez pas changer ma version.');
    
  if (action === "set") {
    
    // User must specify a key.
    if (!key) return message.reply("Aucune key n'a été trouvé");
    // User must specify a key that actually exists!
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    const joinedValue = value.join(" ");
    // User must specify a value to change.
    if (key === "prefix" && joinedValue.lenght > 2) return message.reply('Mon préfix ne peut pas faire plus de 2 caractères');
    if (joinedValue.length > 90) return message.reply("La value est trop grande. (90 Caractères max)");
    if (joinedValue.length < 1) return message.reply("Aucune Value n'a été trouvé");
 
    // User must specify a different value than the current one.
    if (joinedValue === settings[key]) return message.reply("Err: Cette key a déja cette value");
    
    // If the guild does not have any overrides, initialize it.
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    // Modify the guild overrides directly.
    client.settings.set(message.guild.id, joinedValue, key);
  

    // Confirm everything is fine!
    message.reply(`${key} a bien été edité en: ${joinedValue}`);
  } else
  
  // Resets a key to the default value
  if (action === "del" || action === "reset") {
    if (!key) return message.reply("Aucune key n'a été trouver");
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    if (!overrides[key]) return message.reply("Impossible, cette key a déja une valeur par defaut");
    
    // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
    const response = await client.awaitReply(message, `Vous etes sur de vouloir reset la key: ${key} ? ( yes or no )`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      client.settings.delete(message.guild.id, key);
      message.reply(`${key} a bien été reset`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply(`Opération annulé`);
    }
  } else
  
  if (action === "get" || action === "view") {
    if (!key) return message.reply("Aucune key n'a été trouvé");
    if (!defaults[key]) return message.reply("Cette key n'existe pas");
    const isDefault = !overrides[key] ? "\nLa valeur de cette key est par defaut." : "";
    message.reply(` ${key} est actellement: **${settings[key]}${isDefault}**`);
  } else {
    // Otherwise, the default action is to return the whole configuration;
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
    });
    await message.channel.send(`= Guild Setting =\n${array.join("\n")}`, {code: "asciidoc"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["set", "setting"],
  permLevel: "Administrateur"
};

exports.help = {
  name: "settings",
  category: "System",
  description: "Change ou Regarde les paramètre de votre guild.",
  usage: "settings <view/get/set/reset> <key> <value>"
};
