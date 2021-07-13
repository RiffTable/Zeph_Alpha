const scripts = require('./manager');
const { updateSConfig, updateProfile, msgEmb, colorEmb } = scripts;




global.activity = {};

const actResponse = {
    number_game
};

module.exports.handler = function(message){
    const _actData = global.activity[message.author.id];
    const args = _actData.args;
    

    try{
        actResponse[_actData.id](args, message);
    }catch(err){
        console.log('////////////INVALID ACTIVITY////////////');
        console.log(err);
    }
}


function number_game(args, message){
    //args = {num: hnum, tries: 0}

    if(parseInt(message.content)){
        let guess = parseInt(message.content);
        if(guess > args.num)
        {
            /*****HIGH*****/
            msgEmb(message.channel, 'HIGH!', `The number is **lower** than ${guess}`).then((msg)=>{
                msg.delete({timeout: 20000});
            })
            global.activity[message.author.id] = {id: "number_game", args: {num: args.num, tries: args.tries+1}};

        }else if(guess < args.num)
        {
            /*****LOW*****/
            msgEmb(message.channel, 'LOW!', `The number is **higher** than ${guess}`).then((msg)=>{
                msg.delete({timeout: 20000});
            })
            global.activity[message.author.id] = {id: "number_game", args: {num: args.num, tries: args.tries+1}};

        }else
        {
            /*****CORRECT*****/
            msgEmb(message.channel, 'CORRECT!', `You guessed the right number! :partying_face:\n The number was ${guess}\nYou tried ${args.tries+1} times`);
            delete global.activity[message.author.id];
            //------------------------------------------------rewards

        }
    }else{
        if(message.content === 'quit'){
            /*****QUIT*****/
            msgEmb(message.channel, 'QUIT GAME', 'You have exitted the game. Maybe you can try again and see if you can win :eyes:').then((msg)=>{
                msg.delete({timeout: 20000});
            })
            delete global.activity[message.author.id];
        }else{
            /*****INVALID*****/
            msgEmb(message.channel, 'INVALID VALUE', 'Your answer should be a number. If you want to give up, type \`quit\`').then((msg)=>{
                msg.delete({timeout: 20000});
            })
        }
        
    }
}
/*
function set(UserID, ActID, args){
    global.activity[UserID] = {id: ActID, args};
}

function remove(UserID){
    delete global.activity[UserID];
}

function has(UserID){
    return (global.activity[UserID] === undefined);
}

module.exports.set = set;
module.exports.remove = remove;
module.exports.has = has;
*/