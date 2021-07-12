const Discord = require('discord.js');



function colorEmb(){
    return '44a0cc';
}

function msgEmb(channel, title, desc){
    const emb = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(colorEmb())
    .setDescription(desc);
    
    channel.send(emb);
}

//module.exports.msgEmb = msgEmb;
//module.exports.colorEmb = colorEmb;


module.exports = {
    msgEmb,
    colorEmb
};