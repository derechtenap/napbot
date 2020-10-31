'use strict';

// DiscordJS und Fetch ---------------------------------------------------
const Discord = require('discord.js');

const client = new Discord.Client();

const misc = require('./misc.js');
const stats = require('./stats.js');

// Config and Token
const { prefix, language, commandList } = require('./config.json');
const TOKEN = require('./token.json');

// Client on ready -------------------------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set bot status
  client.user.setActivity('.version',  {
      type: 'WATCHING'
  }).catch(console.error);
});

// Client on message -----------------------------------------------------
client.on('message', message => {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    // Ignore messages without prefix and bot messages...
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    if (commandList.includes('version') && command === 'version') {
        message.reply('`' + misc.data.version() + '`');
    }

    if (commandList.includes('profiles') && command === 'profiles') {
        message.reply('ich habe diese Profile gefunden:');
        message.channel.send('`' + misc.data.profiles() + '`');   
    }

    if (commandList.includes('stats') && command === 'stats') {
        if (args.length < 2) {
            message.reply(`dieser Befehl benötigt mehr Parameter!` +
            ` → ${prefix}help`);
        } else {
            message.channel.send('`' + 
            stats.data.getStats(args[0], args[1]) + '`');
        }
    }
});

client.login(TOKEN.id);