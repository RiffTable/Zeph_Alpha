/*****
-------------------------------TODO-------------------------------



*****/

// User ID: 856191064393908234
// 
// Invite Link: https://discord.com/api/oauth2/authorize?client_id=856191064393908234&permissions=2218131008&scope=bot
// 
// 

//Initializations
require('dotenv').config();
const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();


const msgHNDL = require('./command_HNDL');


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





//Event Listening
client.on('ready', () =>{
    console.log("-------Ready o7-------");
});


let testingMode = false;
if(testingMode){
    client.on('message', (message) => {
    
        

    });
}else
    client.on('message', msgHNDL);

//Login
client.login(process.env.BOTTOKEN);


//-------------------
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



