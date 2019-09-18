// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  
  // MP SYSTEME
  
client.users.get(guild.ownerID).send(`= TIPS =

[Bonjour ! ${client.users.get(guild.ownerID).tag} merci de m\'avoir ajouté a ${guild.name} Voici des tips pour mon bon fonctionement !]

• Configuration  :: N'hésitez pas a regarder la commande "set" elle permet de config le prefix et les roles.
• Besoin D'aide? :: N'hésitez pas a utilisé la commande "invite" pour recevoir une invitation sur mon Support.
• Bugs ?         :: N'hésitez pas a utilisé la commabde "bug" pour nous envoyé votre rapport de bug.

`, {code: "asciidoc"});
};
