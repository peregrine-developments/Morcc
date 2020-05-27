const config = require("../config/config.json");

exports.run = (client) => {
    // Announce successful startup
    console.log("\nBot ready for " + client.guilds.cache.size + " servers, " + client.channels.cache.size + " channels, and a total of " + client.users.cache.size + " users!");
    //console.log(client.guilds);
    //client.user.setPresence({ game: { name: "with fire | " + client.config.prefix + "help", type: 0 } });
}