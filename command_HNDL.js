const Discord = require('discord.js');

//const actHNDL = require('./activity_HNDL.js');
const datasFromFile = require('./BetaBot.js');
const client = datasFromFile.client;

//IMPORT COMMANDS



//Access the Server Configuration JSON file
const fs = require('fs');
var serverData;
fs.readFile('./ServerConfig.json', 'utf-8', (err, data) => {
    if(err) console.log(err);
    else{
        serverData = JSON.parse(data);
    }
});


/******CONSTANTS & VARIABLES******/
const userID = '856191064393908234';

/*
    activity[USERID] = {id: "ActivityName", args: {...}}


*/

/*  ACTIVITY HANDLER FUNCTION
*   find function from list by activity id
    AHFunc(args, message)
*/


const commands = {
    
};



const updateSConfig = datasFromFile.updateSConfig;
const msgEmb = datasFromFile.msgEmb;

function ShowTime(time){
    let date = new Date(time);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

module.exports = function(message){

    //log messages
    if(message.content.length < 100) console.log(`[${message.channel.name} ${ShowTime(message.createdTimestamp)}]${message.author.username} > "${message.content}"`);
    



    /*****************IGNORE BOT*****************/
    if(message.author.id === userID){}
    
    /*****************CHECK IF SERVER CONFIG EXISTS*****************/
    else if(!serverData[message.guild.id])
    {
        serverData[message.guild.id] = {};
        serverData[message.guild.id].prefix = '~';
        updateSConfig();
    }
    /*****************CHECK FOR ACTIVITY*****************/
    /*else if(global.activity[message.author.id])
    {
        actHNDL.handler(message);
    }*/
    /*****************COMMAND BY PREFIX*****************/
    else if(message.content.startsWith(serverData[message.guild.id].prefix)){
        //commands
        let args = message.content.substring(serverData[message.guild.id].prefix.length, message.content.length).split(' ');
        const cmd = args.shift();

        //commands[cmd](args, message);
        try{
            commands[cmd](args, message);
        }catch{}
    }



}









/*
//FUNCTION TEMPLATE
function NAME(args, message){
    //
}
*/



