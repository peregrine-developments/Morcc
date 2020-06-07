const config = require("../../config/config.json");

exports.run = (client, message, args) => {
    let designator = "missile";
    if(args.length < 1) designator = args.join(" ");
    
    return message.channel.send("**The " + designator + " knows where it is at all times. It knows this because it knows where it isn't. By subtracting where it is from where it isn't, or where it isn't from where it is (whichever is greater), it obtains a difference, or deviation. The guidance subsystem uses deviations to generate corrective commands to drive the " + designator + " from a position where it is to a position where it isn't, and arriving at a position where it wasn't, it now is. Consequently, the position where it is, is now the position that it wasn't, and it follows that the position that it was, is now the position that it isn't." + "\n\n" +
                                "In the event that the position that it is in is not the position that it wasn't, the system has acquired a variation, the variation being the difference between where the " + designator + " is, and where it wasn't. If variation is considered to be a significant factor, it too may be corrected by the GEA. However, the " + designator + " must also know where it was." + "\n\n" +
                                "The " + designator + " guidance computer scenario works as follows. Because a variation has modified some of the information the " + designator + " has obtained, it is not sure just where it is. However, it is sure where it isn't, within reason, and it knows where it was. It now subtracts where it should be from where it wasn't, or vice-versa, and by differentiating this from the algebraic sum of where it shouldn't be, and where it was, it is able to obtain the deviation and its variation, which is called error.**");                   
}

exports.info = {
    name: "Missile",
    command: "missile",
    desc: "THE MISSILE KNOWS WHERE IT IS AT ALL TI-",
    desc_addi: "",
    usage: config.prefix + "missi;e",
    aliases: [],
    params: [],
    hidden: false,
    whitelist: ["all"],
    category: "Fun"
}
