module.exports = async (client, error) => {
  client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
  message.channel.send(`**Err:**\n${JSON.strinify(error)}`)
};
