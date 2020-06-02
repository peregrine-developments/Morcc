const config = require("../../config/config.json");

const styles = ["fuwwyspeak", "l33t", "oinky"];
const vowels = ["a", "e", "i", "o", "u"];

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
    if (args.length < 1) return message.reply("You haven't specified a style to convert into!");
    if (!styles.includes(args[0])) return message.reply("That style doesn't exist! Current options include:  " + styles.join(", ") + ".") 
    if (args.length < 2) return message.reply("You haven't specified a message to convert!");

    let originalMessage = args.slice(1).join(" ");

    switch(args[0]) {
        case "fuwwyspeak":
            originalMessage = originalMessage.replace(/[rl]/g, "w");
            break;
        case "l33t":
            originalMessage = originalMessage.replace(/l/g, "1").replace(/e/g, "3").replace(/a/g, "4").replace(/s/g, "5").replace(/b/g, "8").replace(/o/g, "0");
            break;
        case "oinky":
            let returnMessage = [];
            args.slice(1).forEach(word => {
                returnMessage.push(translatePigLatin(word));
            });
            originalMessage = returnMessage.join(" ");
            break;
    }

    message.channel.send("**" + message.member.displayName.replace(/\|/g, "\\|") + "** says (in " + args[0] + "): " + originalMessage);
    return message.delete();
}

exports.info = {
    name: "Convert",
    command: "convert",
    desc: "Convert a message into different styles of speech",
    desc_addi: "\nCurrent options include:\n- " + styles.join("\n- "),
    usage: config.prefix + "convert {style} {message}",
    aliases: [""],
    params: [["style", "What style of text to convert your message into"], ["message", "Message to convert"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634"],
    category: "Fun"
}
