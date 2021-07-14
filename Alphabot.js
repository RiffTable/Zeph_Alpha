/*****
-------------------------------TODO-------------------------------

* Get Item

*****/

// User ID: 856191064393908234
// 
// Invite Link: https://discord.com/api/oauth2/authorize?client_id=856191064393908234&permissions=2218131008&scope=bot
// 
// 

//  ADDED
//  -----
//  

//  help, prefix, minesweeper commands; money transfer method on manager; earning possible from number game

//Initializations
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();


const msgHNDL = require('./command_HNDL');





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



