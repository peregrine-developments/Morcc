const config = require('../../config/config.json');
const fs = require('fs');

exports.run = (client, message, args) => {
    let files = fs.readdirSync(`./images/succ/`);

    var pic = files[Math.floor(Math.random() * files.length)];

    return message.channel.send({ files: [`./images/succ/${pic}`] });
}


exports.info = {
    name: "Succ",
    command: "succ",
    desc: "S u c c?",
    desc_addi: "",
    usage: config.prefix + "succ",
    aliases: [],
    params: [],
    hidden: false,
    whitelist: ["689277887181750279", "598539314376474634", "646538454712320035"],
    category: "Fun"
}
