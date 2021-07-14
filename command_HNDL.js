/*
    activity[USERID] = {id: "ActivityName", args: {...}}


*/

/*  ACTIVITY HANDLER FUNCTION
*   find function from list by activity id
    AHFunc(args, message)
*/


const actHNDL = require('./activity_HNDL');
const scripts = require('./manager');
const { updateSConfig, updateProfile, msgEmb, colorEmb, transferCash } = scripts;





/******CONSTANTS & VARIABLES******/
const userID = '856191064393908234';





/******COMMANDS FROM FILES******/
const t = require('./commands/cmd_t');
const help = require('./commands/cmd_help');



const commands = {
    t,
    help,
    eh,
    emb,
    gif,
    uptime,
    prefix,
    number,
    guess: number,
    minesweeper,
    mines: minesweeper
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
    else if(actHNDL.has(message.author.id))
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

//         </>
function gif(args, message){
    
}

//         </>
function uptime(args, message){
    
}

function prefix(args, message){
    if(args.length === 0){
        msgEmb(message.channel, 'SERVER PREFIX', 
        `The prefix for the server is set to \`${global.serverData[message.guild.id].prefix}\`\nYou can set a new prefix by writing \`${global.serverData[message.guild.id].prefix}prefix {prefix}\``);
    }
    else if(args.length === 1){
        global.serverData[message.guild.id].prefix = args[0];
        updateSConfig();
        msgEmb(message.channel, 'SERVER PREFIX CHANGED', 
        `The server prefix has been set to \`${global.serverData[message.guild.id].prefix}\``);
    }
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
            if(min > max){
                return;
            }else if(max > 10000000){
                msgEmb(message.channel, 'Number is too big!', 'The number should be less than 10,000,000 or 10 million');
                return;
            }else if(max-min < 10){
                msgEmb(message.channel, 'The range is too small!', 'The range should be at least 10');
                return;
            }
        }catch{
            msgEmb(message.channel, 'Invalid Argument', 
            `The arguments should be proper positive numbers`);
            return;
        }
        

        var hnum = Math.floor(Math.random()*(max-min+1)+min-1);
    }else{
        msgEmb(message.channel, 'Invalid Argument Count', 
            `Enter the min and max value to specify the range by typing \`${global.serverData[message.guild.id].prefix}number {min} {max}\`. The default is 1 to 100`);
        return;
    }

    actHNDL.set(message.author.id, "number_game", {num: hnum, tries: 0, range: max-min+1});
    msgEmb(message.channel, 'THE NUMBER GAME', `A number has been set between ${min} to ${max}. You need to guess the number. Try guessing!`);
}

function minesweeper(args, message){
    //Obtaining data from argument
    if(args.length === 0){
        var gS = [6, 6];
        var bCount = 5;
    }else if(args.length === 2){
        var gS = args[0].split('x');
        if(gS.length === 2){
            gS[0] = parseInt(gS[0]);
            gS[1] = parseInt(gS[1]);
            if(gS[0] > 16 || gS[1] > 32){
                msgEmb(message.channel, 'Invalid Grid Size', 'Grid size cannot be more than 16x32!');
                return;
            }
        }else{
            msgEmb(message.channel, 'Invalid Grid Format', 'The grid should be writen in "8x8" "6x6" format!');
            return;
        }
        var bCount = parseInt(args[1]);
        if(bCount > gS[0]*gS[1]/2){
            msgEmb(message.channel, 'Invalid Bomb Count', 'Bomb count is more than half the area of the grid!');
            return;
        }
    }else{
        msgEmb(message.channel, 'Invalid Argument Counts', 'Use 2 or no arguments');
        return;
    }

    //Grid making
    grid = new Array(gS[0]);

    for(let i=0; i<gS[0]; i++){
        grid[i] = new Array(gS[1]);
        for(let j=0; j<gS[1]; j++){
            grid[i][j] = 0;
        }
    }


    //Setting up bombs
    for(let _b=0; _b<bCount; _b++){
        //Checking if the position is bomb clear
        while(true){
            //Pick random pos
            var a = Math.floor(Math.random()*gS[0]);
            var b = Math.floor(Math.random()*gS[1]);
            if(grid[a][b] === -1) continue;

            grid[a][b] = -1;
            break;
        }
        
        //Bomb surounding filling
        for(let i=-1; i<2; i++){
            for(let j=-1; j<2; j++){
                if(a+i >= gS[0] || a+i < 0) continue;
                if(b+j >= gS[1] || b+j < 0) continue;

                if(grid[a+i][b+j] !== -1){
                    grid[a+i][b+j]++;
                }
            }
        }
    }

    //Prepare the message
    let emoji = ['bomb', 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    let msgStr = '';
    for(let i=0; i<gS[0]; i++){
        for(let j=0; j<gS[1]; j++){

            msgStr += `||:${emoji[grid[i][j]+1]}:|| `;

        }
        msgStr += '\n';
    }
    
    
    msgEmb(message.channel, 'Minesweeper mini-game!', 
    `\n**Click on the hidden tiles to reveal it and avoid the bombs!**\nThere are ${bCount} bombs in this ${gS[0]}x${gS[1]} grid`);
    message.channel.send(msgStr);
}




/*
//FUNCTION TEMPLATE
function NAME(args, message){
    //
}
*/



