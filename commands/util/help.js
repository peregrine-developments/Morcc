const config = require("../../config/config.json");

// Load libraries
const fs = require("fs");
const clean = require("sanitize-filename");

exports.run = (client, message, args) => {
    if (args.length < 1) {
        // List all commands
        let flds = [];

        // Preprocess commands to get category list
        let commandCategories = new Map();
        client.commands.forEach(com => {
            if (!com.info.hidden) {
                if (commandCategories.has(com.info.category)) {
                    let categoryContents = commandCategories.get(com.info.category);
                    commandCategories.set(com.info.category, categoryContents + "\n" + com.info.name + " (" + com.info.command + "): " + com.info.desc);
                } else {
                    commandCategories.set(com.info.category, com.info.name + " (" + com.info.command + "): " + com.info.desc);
                }
            }
        });

        let helpBody = ""
        for (var [key, val] of commandCategories) {
            helpBody += "__**" + key + ":**__\n" + val + "\n";
        }
        let bodyField = {
            name: "Commands",
            value: helpBody
        };
        flds.push(bodyField);

        return message.channel.send({
            embed: {
                color: 4881584,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Help",
                description: "All Morcc commands\nUse " + config.prefix + "help {command} to get more specific info\n**PLEASE NOTE:** Some commands only work in specific channels!\nCommand-specific help info will include permitted channels!",
                fields: flds,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© 2018 AbsurdBrd Development"
                }
            }
        }).then(message.react("✅"));
        //    .then(() => { if (message.channel.type == "text") message.delete([timeout = 5000]); });
    } else {
        let found = false;

        let comName = clean(args[0]);
        let command = null;

        if (client.commands.has(comName)) {
            command = client.commands.get(comName).info;
            found = true;
        } else {
            client.commands.forEach(comm => {
                if (comm.info.aliases.includes(comName) && !found) {
                    command = comm.info;
                    found = true;
                }
            });
        }

        if (!found || (command.hidden && message.author.id != config.ownerID)) {
            return message.reply("That command does not exist!");
            /*.then(msg => {
                msg.delete(5000)
            });*/
        }

        let flds = [{
            name: "Usage",
            value: command.usage
        }];

        if (command.params.length > 0) {
            let first = true;
            let val = "";

            command.params.forEach(line => {
                if (!first) {
                    val += "\n";
                }
                val += line[0] + ": " + line[1];
                first = false;
            });

            let newField = {
                name: "Parameters",
                value: val
            };

            flds.push(newField);
        }
        if (command.aliases.length > 0) {
            let first2 = true;
            let val2 = "";

            command.aliases.forEach(line2 => {
                if (!first2) {
                    val2 += ", ";
                }
                val2 += client.config.prefix + line2;
                first2 = false;
            });

            let newField2 = {
                name: "Aliases",
                value: val2
            };

            flds.push(newField2);
        }

        let channellist = "";
        if (command.whitelist.includes("all")) {
            channellist = "Everywhere";
        } else {
            let first = true;
            command.whitelist.forEach(c => {
                if(message.guild.channels.cache.has(c)) {
                    if (!first) channellist += "\n";
                    channellist += "#" + client.channels.cache.get(c).name;
                    first = false;
                }
            });
        }

        let newField3 = {
            name: "Functional Channels",
            value: channellist
        };
        flds.push(newField3);

        return message.channel.send({
            embed: {
                color: 4881584,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: command.name,
                description: command.desc + command.desc_addi,
                fields: flds,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© 2018 AbsurdBrd Development"
                }
            }
        }).then(message.react("✅"));
        //    .then(() => { if(message.channel.type == "text") message.delete(5000); });
    }
}

exports.info = {
    name: "Help",
    command: "help",
    desc: "Gives list of all bot commands or specific info on command given",
    desc_addi: "",
    usage: config.prefix + "help OR " + config.prefix + "help {command}",
    aliases: ["h"],
    params: [["command", "Name of command to retrieve"]],
    hidden: false,
    whitelist: ["all"],
    category: "Util"
}
