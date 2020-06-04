const config = require("../../config/config.json");

const translatePigLatin = (str) => {
    let consonantRegex = /^[^aeiou]+/;
    let myConsonants = str.match(consonantRegex);
    return myConsonants !== null
        ? str
            .replace(consonantRegex, "")
            .concat(myConsonants)
            .concat("ay")
        : str.concat("way");
}
  
exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("You haven't specified a message to convert!");

    let newMessage = args.join(" ");

    // Actual conversion
    let returnMessage = [];
    args.slice(1).forEach(word => {
        returnMessage.push(translatePigLatin(word));
    });
    newMessage = returnMessage.join(" ");

    message.channel.send("**" + message.member.displayName.replace(/\|/g, "\\|") + "** says (in pig latin): " + newMessage);
    return message.delete();
}

exports.info = {
    name: "Pig Latin",
    command: "piglatin",
    desc: "Convert a message into pig latin",
    desc_addi: "",
    usage: config.prefix + "piglatin {message}",
    aliases: ["pig", "oinky"],
    params: [["message", "Message to convert"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634"],
    category: "Fun"
}