const Discord = require('discord.js');
const fs = require('fs');


/****INIT DATA FILE****/
global.profiles;
global.serverData;

//Read Server Configuration JSON file
fs.readFile('./ServerConfig.json', 'utf-8', (err, data) => {
    if(err) console.log(err);
    else{
        global.serverData = JSON.parse(data);
    }
});

//Read Profile Data JSON file
fs.readFile('./ProfileData.json', 'utf-8', (err, data) => {
    if(err) console.log(err);
    else{
        global.profiles = JSON.parse(data);
    }
});


//File Manager
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


//Scripts

function colorEmb(){
    return '44a0cc';
}

function msgEmb(channel, title, desc){
    const emb = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(colorEmb())
    .setDescription(desc);
    
    return channel.send(emb);
}

module.exports.msgEmb = msgEmb;
module.exports.colorEmb = colorEmb;


