'use strict';

// DiscordJS und Fetch ---------------------------------------------------
const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();

const misc = require('./misc.js');

// Config and Token
const { prefix, language, commandList } = require('./config.json');
const TOKEN = require('./token.json');

// Client on ready -------------------------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set bot status
  client.user.setActivity(`.version - ${misc.data.version()}`,  {
      type: 'WATCHING'
  })
    .catch(console.error);
});

// Client on message -----------------------------------------------------
client.on('message', message => {
    const ARGS = message.content.slice(prefix.length).split(' ');
    const command = ARGS.shift().toLowerCase();

    // Ignore messages without prefix and bot messages...
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    if(commandList.includes('version') && command === 'version') {
        message.channel.send('`' + misc.data.version() + '`');
    }
});

client.login(TOKEN.id);