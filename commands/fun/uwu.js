const config = require("../../config/config.json");

exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("You haven't specified a message to convert!");

    let newMessage = args.join(" ");

    // Actual conversion
    newMessage = newMessage.replace(/[rl]/g, "w");

    message.channel.send("**" + message.member.displayName.replace(/\|/g, "\\|") + "** says (in furryspeak): " + newMessage);
    return message.delete();
}

exports.info = {
    name: "Uwu",
    command: "uwu",
    desc: "Convert a message into furryspeak",
    desc_addi: "",
    usage: config.prefix + "uwu {message}",
    aliases: ["furry"],
    params: [["message", "Message to convert"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634", "646538454712320035"],
    category: "Fun"
}
