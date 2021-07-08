//Initializations
require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.client = client;





//Functions
module.exports.updateSConfig = function(){
    fs.writeFile('./ServerConfig.json', JSON.stringify(serverData, null, 2), (err) => {
        if(err) console.log(err);
        else console.log('---Updated Server Config file');
    });
}

module.exports.msgEmb = new function(channel, title, desc){
    const emb = new Discord.MessageEmbed()
    .setTitle(title)
    .setColor('44a0cc')
    .setDescription(desc)
    .setFooter('Made by BetaBot');

    return channel.send(emb);
}







//Event Listening
client.on('ready', () =>{
    console.log("-------Ready o7-------");
});

const msgHNDL = require('./command_HNDL');

client.on('message', msgHNDL);





let falseanyway = false;
if(falseanyway){
    //testing
    client.on('message', (message) => {
        


    });
}

//Login
client.login(process.env.BOTTOKEN);