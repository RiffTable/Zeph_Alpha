const Discord = require('discord.js');



function msgEmb(channel, title, desc){
    const emb = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor('44a0cc')
    .setDescription(desc)
    .setFooter('Embedded Message');
    
    channel.send(emb);
}

module.exports.msgEmb = msgEmb;