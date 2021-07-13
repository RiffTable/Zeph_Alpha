/*
    activity[USERID] = {id: "ActivityName", args: {...}}


*/

/*  ACTIVITY HANDLER FUNCTION
*   find function from list by activity id
    AHFunc(args, message)
*/


const actHNDL = require('./activity_HNDL');
const scripts = require('./manager');
const { updateSConfig, updateProfile, msgEmb, colorEmb } = scripts;





/******CONSTANTS & VARIABLES******/
const userID = '856191064393908234';





/******COMMANDS FROM FILES******/
const t = require('./commands/cmd_t');



const commands = {
    eh,
    emb,
    t,
    number,
    guess: number
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

function number(args, message){
    //Set random number
    if(args.length === 0){
        var min = 1;
        var max = 100;

        var hnum = Math.floor(Math.random()*100);
    }else if(args.length === 2){
        try{
            var min = Math.floor(parseInt(args[0]));
            var max = Math.floor(parseInt(args[1]));
        }catch{
            msgEmb(message.channel, 'Invalid Argument', 
            `The arguments should be proper positive numbers`);
        }
        

        var hnum = Math.floor(Math.random()*(max-min+1)+min-1);
    }else{
        msgEmb(message.channel, 'Invalid Argument Count', 
            `Enter the min and max value to specify the range by typing \`${global.serverData[message.guild.id].prefix}number {min} {max}\`. The default is 1 to 100`);
        return 0;
    }


    global.activity[message.author.id] = {id: "number_game", args: {num: hnum, tries: 0}};
    msgEmb(message.channel, 'THE NUMBER GAME', `A number has been set between ${min} to ${max}. You need to guess the number. Try guessing!`);
}





/*
//FUNCTION TEMPLATE
function NAME(args, message){
    //
}
*/



