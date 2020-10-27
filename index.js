'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();

const MISC = require('./misc.js');

// Config and Token
const CONFIG = require('./config.json');
const TOKEN = require('./token.json');
const PREFIX = CONFIG.prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set bot status
  client.user.setActivity(`.version - ${MISC.data.version()}`,  {
      type: 'WATCHING'
  })
    .then(presence => console.info(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

client.on('message', msg => {
    const ARGS = msg.content.slice(PREFIX.length).split(' ');
    const COMMAND = ARGS.shift().toLowerCase();

    // Ignore messages without prefix and bot messages...
    if(!msg.content.startsWith(PREFIX) || msg.author.bot) return; 

    if(COMMAND === 'version') {
        msg.channel.send('`' + MISC.data.version() + '`');
    }
});

client.login(TOKEN.id);