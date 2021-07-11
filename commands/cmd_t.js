const Discord = require('discord.js');
const scripts = require('../library');

const teas = require('./teas.json');


const msgEmb = scripts.msgEmb;



const t_commands = {
    shop
};

module.exports = function(args, message)
{
    if(args.length > 0){
        let cmd = args.shift();
        t_commands[cmd](args, message);
    }
}

function shop(args, message){
    //---------------------set description here!
    let desc = '[INSERT DESCRIPTIONS HERE]\n';
    let pageNum;
    let pageLimit = 10;
    let maxPage = Math.ceil(teas.length/pageLimit);
    
    if(args.length === 0) pageNum = 1;
    else if(args.length === 1){
        pageNum = parseInt(args[0]);
        if(pageNum < 1 || pageNum > maxPage){
            msgEmb(message.channel, 'Error', `Invalid Page Number\nPage number {1...${maxPage}}`);
        }
    }
    else return;



    //Page item list size
    let start = (pageNum-1)*pageLimit;
    let listSize = teas.length - start;
    if(listSize > pageLimit) listSize = pageLimit;

    //Loop for menu items
    for(let i = start; i<listSize; i++){
        //---------------------TEA EMOTES
        let line = `\`${teas[i].id} |\` :tea: **${teas[i].name}**-------${teas[i].price}\n`;
        desc += line;
    }



    
    const shopEmb = new Discord.MessageEmbed()
    .setTitle("Welcome to the Tea Shop")
    .setColor('44a0cc')
    .setDescription(desc)
    .setFooter(`page number ${pageNum}`);
    message.channel.send(shopEmb).then((res) => {
        //
    });
}
