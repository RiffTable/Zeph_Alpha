const scripts = require('./manager');
const { updateSConfig, updateProfile, msgEmb, colorEmb, transferCash } = scripts;




var activity = {};

const actResponse = {
    number_game
};

module.exports.handler = function(message){
    const _actData = activity[message.author.id];
    const args = _actData?.args;
    

    try{
        actResponse[_actData.id](args, message);
    }catch(err){
        console.log('////////////INVALID ACTIVITY////////////');
        console.log(err);
    }
}


function number_game(args, message){
    //args = {num: hnum, tries: 0, range: 100}

    if(parseInt(message.content)){
        let guess = parseInt(message.content);
        if(guess > args.num)
        {
            /*****HIGH*****/
            msgEmb(message.channel, 'HIGH!', `The number is **lower** than ${guess}`).then((msg)=>{
                msg.delete({timeout: 20000});
            })
            activity[message.author.id].args.tries++;
            
        }else if(guess < args.num)
        {
            /*****LOW*****/
            msgEmb(message.channel, 'LOW!', `The number is **higher** than ${guess}`).then((msg)=>{
                msg.delete({timeout: 20000});
            })
            activity[message.author.id].args.tries++;
            
        }else
        {
            /*****CORRECT*****/
            let reward = 7*Math.pow(Math.log2(args.range), 3)/(args.tries+1);
            transferCash(undefined, message.author.id, Math.round(reward));

            msgEmb(message.channel, 'CORRECT!', `You guessed the right number! :partying_face:\n The number was ${guess}\nYou tried ${args.tries+1} times within the range of ${args.range}\nYou earned ${Math.round(reward)}Å`);
            remove(message.author.id);
            //  level: log2(range)
            //  (multiplier): 7
            //  round((multiplier)*(level^3/tries))

        }
    }else{
        if(message.content === 'quit'){
            /*****QUIT*****/
            msgEmb(message.channel, 'QUIT GAME', 'You have exitted the game. Maybe you can try again and see if you can win :eyes:').then((msg)=>{
                msg.delete({timeout: 20000});
            })
            remove(message.author.id);
        }else{
            /*****INVALID*****/
            msgEmb(message.channel, 'INVALID VALUE', 'Your answer should be a number. If you want to give up, type \`quit\`').then((msg)=>{
                msg.delete({timeout: 20000});
            })
        }
        
    }
}

function set(UserID, ActID, args){
    activity[UserID] = {id: ActID, args};
}

function remove(UserID){
    delete activity[UserID];
}

function has(UserID){
    return (activity[UserID] !== undefined);
}

module.exports.set = set;
module.exports.remove = remove;
module.exports.has = has;