const config = require("../../config/config.json");

const charToBig = (ch) => {
    if (ch == " ") {
        return "\xa0\xa0\xa0";
    } else if (ch >= "a" && ch <= "z") {
        return ":regional_indicator_" + ch + ":";
    } else if (ch >= "0" && ch <= "9") {
        switch (ch) {
            case "0":
                return ":zero:";
            case "1":
                return ":one:";
            case "2":
                return ":two:";
            case "3":
                return ":three:";
            case "4":
                return ":four:";
            case "5":
                return ":five:";
            case "6":
                return ":six:";
            case "7":
                return ":seven:";
            case "8":
                return ":eight:";
            case "9":
                return ":nine:";
            default:
                return "";
        }
    } else if (ch == "#") {
        return ":hash:";
    } else {
        return "";
    }
}

exports.run = (client, message, args) => {
    if (args.length < 1) return message.reply("You haven't specified a message to convert!");

    let fullmsg = args.join(" ");
    let fullmsgsplit = fullmsg.split("");
    let msg = "";

    fullmsgsplit.forEach(c => {
        msg += charToBig(c.toLowerCase());
    });

    if (msg.length > 2000) {
        message.reply("Message is too long to convert to bigtext!");
        return;
    }

    message.channel.send("**" + message.member.displayName.replace(/\|/g, "\\|") + "** says (in big): " + msg);
    return message.delete();
}

exports.info = {
    name: "Bigtext",
    command: "bigtext",
    desc: "Makes your message E X T R A  V I S I B L E",
    desc_addi: "",
    usage: config.prefix + "bigtext {text}",
    aliases: ["big"],
    params: [["text", "Text to convert into big"]],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634"],
    category: "Fun"
}
