const config = require("../../config/config.json");
const convert = require("./convert");

exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("You haven't specified a message to convert!");

    let newArgs = ["fuwwyspeak"].concat(args);

    convert.run(client, message, newArgs);
}

exports.info = {
    name: "UWU",
    command: "uwu",
    desc: "Alias for \"convert fuwwyspeak\"",
    desc_addi: "",
    usage: config.prefix + "uwu {message}",
    aliases: [""],
    params: [["message", "Message to convert"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634"],
    category: "Fun"
}
