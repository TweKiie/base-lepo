module.exports = async client => {
    // Log that the bot is online.
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

    // Make the bot "play the game" which is the help command with default prefix.
    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "WATCHING"});

    const activities_list = [
        `${client.settings.get("default").prefix}help`,
        `${client.settings.get("default").prefix}help`,

        `${client.guilds.size} Guilds`,
        `${client.commands.size} Commands`
    ]; // creates an arraylist containing phrases you want your bot to switch through.


    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], {
            type: "WATCHING"
        }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.

    client.user.setStatus('idle')
};