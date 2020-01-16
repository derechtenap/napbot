// napbot - AOE2 Statistik-Bot
// @derechtenap
// 16.01.2020

/**
*
    index.js
    ------------------------------------------------
    Alle Bot-Commands befinden sich in dieser Datei.
    ------------------------------------------------
*
**/

const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');
const version = require('./version.js');
const prefix = config.prefix; // Bot-Prefix
const client = new Discord.Client();

// Start
client.on('ready', () => {
    console.log(client.user.tag + ' ist bereit! (' + version.data.zeigeVersion() + ')');

    // Zeige verbundene Server an
    console.log('\nIch bin mit folgenden Servern verbunden:\n');
    client.guilds.forEach((guild) => {
    console.log('- ' + guild.name)
    })
});

// onMessage
client.on('message', message => {

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore

    // --- Befehle ---

    if (command === 'version') {
        console.log(message.author.tag + ' hat den Befehl ' + command + ' benutzt.');
        message.channel.send('Version: `' + version.data.zeigeVersion() + '`');
    }


});

client.login(token.id);