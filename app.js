// Morcc v0.0.1
// Developed by Perry-Green
// Discord.js & Node.js
// Built from the Advanced Command Handler
console.log("Sup broskis its ya boi morcc back addit again");
console.log("Les get goin");

// Load libraries
const Discord = require("discord.js");
const fs = require("fs");
const clean = require("sanitize-filename");
const dateFormat = require("dateformat");

// Setup variables
var client = new Discord.Client();

console.log("Libraries loaded");

// Load configs
client.core = require("./config/core.json");
client.config = require("./config/config.json");

console.log("Configs loaded");

// Setup functions
const requireAllFiles = (dir, comArray) => {
    // Recursively re-require all files from ./commands/ and respective subdirectories
    try {
        files = fs.readdirSync(dir);
        files.forEach(f => {
            if (fs.statSync(dir + f).isDirectory()) {
                requireAllFiles(dir + f + "/", comArray);
            } else {
                delete require.cache[require.resolve(dir + f)];
                let commandFile = require(dir + f);
                let commandName = f.split(".")[0];
                comArray.set(commandName, commandFile);
            }
        });
    } catch (err) {
        console.error(err);
    }
}

const splitString = (string, size, multiline) => {
    // Split a string into an array of maximum-length strings
    var matchAllToken = (multiline == true) ? '[^]' : '.';
    var re = new RegExp(matchAllToken + '{1,' + size + '}', 'g');
    return string.match(re);
}

console.log("Functions created");

// Setup listeners
var eventList = fs.readdirSync("./events/");
eventList.forEach(f => {
    var eventFunction = require("./events/" + f);
    var eventName = f.split(".")[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args));
});

// Load all commands
client.commands = new Map()

const loadBotFunctions = () => {
    // Use-specific command reload function

    // Load all bot commands
    requireAllFiles("./commands/", client.commands);
}

const reloadBotFunctions = () => {
    // Use-specific command reload function

    // Delete config require cache
    delete require.cache[require.resolve("./config/core.json")];
    delete require.cache[require.resolve("./config/config.json")];

    // Re-require config
    client.core = require("./config/core.json");
    client.config = require("./config/config.json");

    // Load all bot commands
    requireAllFiles("./commands/", client.commands);
}

loadBotFunctions();

// Setup message listening
client.on("message", message => {
    if (message.author.bot)
        return;

    /*
    if (!(message.channel.id == "510923397577048075" || message.channel.id == "496805852507013131") && /\|\|[\S\s]+\|\|/g.test(message)) {
        return message.delete();
    }
    */

    if (message.content.toLowerCase().indexOf(client.config.prefix) !== 0)
        return;

    var args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    var commandTemp = args.shift().toLowerCase();
    var command = clean(commandTemp);

    try {
        if (command == "reload") {
            // Reload command
            if (message.author.id != client.core.ownerID) return;
            client.commands.clear();
            reloadBotFunctions();

            console.log(`${message.author.username} reloaded commands on ${new Date()}`);
            return message.reply(`Reloaded commands & configs!`);
        }

        /*
        if (command == "eval") {
            // Eval command
            if (message.author.id != client.core.ownerID || args.length < 1) return;
            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                return message.channel.send(`\`CODE\` \`\`\`${cleanEval(code)}\`\`\`\n \`OUTPUT\` \`\`\`${cleanEval(evaled)}\`\`\``);
            } catch (err) {
                return message.channel.send(`\`ERROR\` \`\`\`xl\n${cleanEval(err)}\n\`\`\``);
            }
        }
        */

        // Actually run functions
        let found = false;
        if (client.commands.has(command)) {
            let funct = client.commands.get(command);
            if (message.channel.type == "text" && !funct.info.whitelist.includes(message.channel.id) && !funct.info.whitelist.includes("all") && message.channel.id != "646538454712320035") return;
            funct.run(client, message, args);
            found = true;
        } else {
            client.commands.forEach(com => {
                if (com.info.aliases.includes(command) && !found) {
                    if (message.channel.type == "text" && !com.info.whitelist.includes(message.channel.id) && !com.info.whitelist.includes("all") && message.channel.id != "646538454712320035") return;
                    com.run(client, message, args);
                    found = true;
                }
            });
        }

        // TODO: determine a better way to display command nonexistent
    } catch (err) {
        console.log(err);
    }
});

// Setup error listening
//client.on("debug", (e) => console.log(e));
client.on("error", (e) => console.error(e)); // TODO: DM error message to owner using ownerID
client.on("warn", (e) => console.warn(e));

// Finalize bot setup
client.login(client.core.token);