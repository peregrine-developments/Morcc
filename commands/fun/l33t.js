const config = require("../../config/config.json");

exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("You haven't specified a message to convert!");

    let newMessage = args.join(" ");

    // Actual Conversion
    newMessage = newMessage.replace(/l/gi, "1").replace(/e/gi, "3").replace(/a/gi, "4").replace(/s/gi, "5").replace(/b/gi, "8").replace(/o/gi, "0");

    message.channel.send("**" + message.member.displayName.replace(/\|/g, "\\|") + "** says (in l33tspeak): " + newMessage);
    return message.delete();
}

exports.info = {
    name: "L33t",
    command: "l33t",
    desc: "Convert a message into l33tspeak",
    desc_addi: "",
    usage: config.prefix + "l33t {message}",
    aliases: ["l33tspeak"],
    params: [["message", "Message to convert"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634", "646538454712320035"],
    category: "Fun"
}
