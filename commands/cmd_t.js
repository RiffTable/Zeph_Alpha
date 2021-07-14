const Discord = require('discord.js');
const scripts = require('../manager');
const { updateSConfig, updateProfile, msgEmb, colorEmb, transferCash } = scripts;

const teas = require('./teas.json');





const t_commands = {
    shop,
    buy
};

module.exports = function(args, message)
{
    if(args.length > 0){
        let cmd = args.shift();
        t_commands[cmd](args, message);
    }
}

function shop(args, message){
    let desc = `There are many flavors of tea you can choose from.\n - Type \`${global.serverData[message.guild.id].prefix}t buy {id}\` to buy teas\n - Type \`${global.serverData[message.guild.id].prefix}t shop {PageNumber}\` to access other pages\n**NOTE: The tea will be consumed as soon as it is bought. Also you will get a 10 minute cooldown before you can drink another one.**\n\n`;
    let pageNum;
    let pageLimit = 10;
    let maxPage = Math.ceil(teas.length/pageLimit);
    
    if(args.length === 0) pageNum = 1;
    else if(args.length === 1){
        pageNum = parseInt(args[0]);
        if(pageNum < 1 || pageNum > maxPage){
            msgEmb(message.channel, 'Invalid Page Number', `Page number {1...${maxPage}}`);
            return;
        }
    }
    else return;



    /**Page item list size**/
    let start = (pageNum-1)*pageLimit;
    let listSize = teas.length - start;
    if(listSize > pageLimit) listSize = pageLimit;

    /**Loop for menu items**/
    for(let i = 0; i<listSize; i++){
        //---------------------TEA EMOTES
        //---------------------CURRENCY SIGN
        let line = `\`${teas[i+start].id} |\` :tea: **${teas[i+start].name}**-------${teas[i+start].price}Å\n`;
        desc += line;
    }


    const shopEmb = new Discord.MessageEmbed()
    .setTitle("Welcome to the Tea Shop")
    .setColor(colorEmb())
    .setDescription(desc)
    .setFooter(`Page Number ${pageNum} | There are total ${teas.length} teas`);
    message.channel.send(shopEmb);
}

function buy(args, message){
    if(args.length === 1){
        var buyID = parseInt(args[0]);
    }else{
        msgEmb(message.channel, 'Invalid Arguments Count', 'You need to specify the id of what you want to buy. Check the shop');
        return;
    }

    /**Money low**/
    if(global.profiles[message.author.id].balance < teas[buyID-1].price){
        msgEmb(message.channel, 'You don\'t have enough money to make purchase', `Get some money before you buy!`);
        return;
    }
    
    /**Countdown**/
    if(global.profiles[message.author.id].tea_delay > message.createdTimestamp){
        msgEmb(message.channel, 'TOO SOON!', `You can't drink anymore tea yet! There is a 10 mins cooldown with ${Math.ceil((global.profiles[message.author.id].tea_delay - message.createdTimestamp)/1000)} seconds remaining`);
        return;
    }
    global.profiles[message.author.id].tea_delay = message.createdTimestamp + 10*60000;
    transferCash(message.author.id, "T_store", teas[buyID-1].price);
    
    
    /**purchase message**/
    const purchEmb = new Discord.MessageEmbed()
    .setTitle(`You Made a Purchase!`)
    .setColor(colorEmb())
    .setDescription(`**You Have Brought the ${teas[buyID-1].name}**\n${teas[buyID-1].tasteDesc}`)
    //---------------------CURRENCY SIGN
    .setFooter(`Your Payment: ${teas[buyID-1].price}Å | Your Current Balance: ${global.profiles[message.author.id].balance}Å`);
    message.channel.send(purchEmb);
}





