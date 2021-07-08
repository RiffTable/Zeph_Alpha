const Discord = require('discord.js');



module.exports.msgEmb = function(channel, title, desc){
    const emb = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor('44a0cc')
    .setDescription(desc)
    .setFooter('Made by BetaBot');
    
    channel.send(emb);
}