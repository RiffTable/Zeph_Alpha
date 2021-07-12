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
global.serverData;
fs.readFile('./ServerConfig.json', 'utf-8', (err, data) => {
    if(err) console.log(err);
    else{
        global.serverData = JSON.parse(data);
    }
});

//Access the Profile Data JSON file
global.profiles;
fs.readFile('./ProfileData.json', 'utf-8', (err, data) => {
    if(err) console.log(err);
    else{
        global.profiles = JSON.parse(data);
    }
});


/******CONSTANTS & VARIABLES******/
const userID = '856191064393908234';




/******FUNCTIONS******/
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
    else if(!global.serverData[message.guild.id])
    {
        global.serverData[message.guild.id] = {prefix: '~'};
        updateSConfig();
    }
    /*****************HANDLE ACTIVITIES*****************/
    else if(global.activity[message.author.id])
    {
        actHNDL.handler(message);
    }
    /*****************HANDLE COMMANDS*****************/
    else if(message.content.startsWith(global.serverData[message.guild.id].prefix)){
        //commands
        let args = message.content.substring(global.serverData[message.guild.id].prefix.length, message.content.length).split(' ');
        const cmd = args.shift().toLowerCase();

        //Create Profile if doesn't exist
        if(!global.profiles[message.author.id]){
            global.profiles[message.author.id] = {balance: 0, tea_delay: 0,  inv: {}};
            updateProfile();
        }

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



