const Discord = require('discord.js');
const fs = require('fs');



//File Manager  mainJS.fmanage
function updateSConfig(){
    fs.writeFile('./ServerConfig.json', JSON.stringify(global.serverData, null, 2), (err) => {
        if(err) console.log(err);
        else console.log('---Updated Server Config file');
    });
}
function updateProfile(){
    fs.writeFile('./ProfileData.json', JSON.stringify(global.profiles, null, 2), (err) => {
        if(err) console.log(err);
        else console.log('---Updated Profile data');
    });
}

module.exports.updateSConfig = updateSConfig;
module.exports.updateProfile = updateProfile;


//Scripts       mainJS.scripts

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

module.exports.msgEmb = msgEmb;
module.exports.colorEmb = colorEmb;


