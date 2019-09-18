const {
    inspect
} = require("util");
const moment = require("moment")

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

    if (!action) {
        message.channel.send(`= CHANNEL =
[Usage]

• del / sup  :: Supprime un channel ( ${message.settings.prefix}channel del <id>)
• add / new  :: Crée un channel ( ${message.settings.prefix}channel add <name>)
• info       :: Informations sur un channel ( ${message.settings.prefix}channel info <id>)
• rename     :: Renome un channel ( ${message.settings.prefix}channel rename <id> <newName>)
`, {
            code: "asciidoc"
        });
    }


    if (action === "info") {



        if (!key) return message.reply("Aucune ID n'a été trouvé");
        if (isNaN(key)) return message.reply('L\'ID est incorrect.')
        if (key.length < 18 || key.length > 18) return message.reply('Probleme, l\'id est incorrect')

        if (key.length = 18) {


            let channel = message.guild.channels.get(key)

            const type = channel.type

            function name(type) {
                if (type == "text") return 'Textuelle';
                if (type == "voice") return 'Vocal';
                if (type == "category") return 'Catégorie';
                return "Un problème est survenue, impossible de trouvé le type de channel"

            }

            if (!channel) return message.reply('Impossible')
            if (channel) return message.channel.send(`= CHANNEL =
[Général]
• Nom            :: #${channel.name}
• ID             :: ${channel.id}
• Création       :: ${moment.utc(channel.createdAt).format("DD/MM/YYYY")}
• Type           :: ${name(type)}
`, {
                code: "asciidoc"
            });
        };
    }

    if (action === "add"  || action === "create") {
        message.reply('wait ...')
    }

    if (action === "del" || action === "supp") {
        message.reply('wait ...')
    }
  
      if (action === "rename") {
        message.reply('wait ...')
    }


};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["chan"],
    permLevel: "Administrateur"
};

exports.help = {
    name: "channel",
    category: "guild",
    description: "Créé, Supprime des Channels et catégorie",
    usage: "channel [info/del/add/rename] <id/type> <name>"
};