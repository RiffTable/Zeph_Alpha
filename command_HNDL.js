/*
    activity[USERID] = {id: "ActivityName", args: {...}}


*/

/*  ACTIVITY HANDLER FUNCTION
*   find function from list by activity id
    AHFunc(args, message)
*/


const actHNDL = require('./activity_HNDL');


const scripts = require('./library');


//IMPORT COMMANDS
msgEmb = scripts.msgEmb;



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




/******FUNCTIONS******/
function updateSConfig(){
    fs.writeFile('./ServerConfig.json', JSON.stringify(serverData, null, 2), (err) => {
        if(err) console.log(err);
        else console.log('---Updated Server Config file');
    });
}

/******COMMANDS FROM FILES******/
const t = require('./commands/cmd_t');



const commands = {
    eh,
    emb,
    t
};




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
    /*****************HANDLE ACTIVITIES*****************/
    else if(global.activity[message.author.id])
    {
        actHNDL.handler(message);
    }
    /*****************HANDLE COMMANDS*****************/
    else if(message.content.startsWith(serverData[message.guild.id].prefix)){
        //commands
        let args = message.content.substring(serverData[message.guild.id].prefix.length, message.content.length).split(' ');
        const cmd = args.shift().toLowerCase();
        var k = '';

        try{
            commands[cmd](args, message);
        }catch{}
    }



}



function eh(args, message){
    message.channel.send('eh');
}

function emb(args, message){
    msgEmb(message.channel, 'EMBEDDED MESSAGE', args.join(' '));
}





/*
//FUNCTION TEMPLATE
function NAME(args, message){
    //
}
*/



