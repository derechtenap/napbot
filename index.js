// napbot - AOE2 Statistik-Bot
// @derechtenap
// 19.01.2020

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
const misc = require('./misc.js');
const ladder = require('./ladder.js');
const prefix = config.prefix; // Bot-Prefix
const client = new Discord.Client();

// --- Start ---

client.on('ready', () => {
    console.log(client.user.tag + ' ist bereit! (' + misc.data.zeigeVersion() + ')');

    // Zeigt verbundene Server an
    console.log('\nIch bin mit folgenden Servern verbunden:\n');
    client.guilds.forEach((guild) => {
    console.log('- ' + guild.name)
    }),

    // Bot-Status
    client.user.setActivity('.help', {
        type: 'PLAYING'
    })
});

// --- onMessage ---

client.on('message', message => {

    var args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    // Loggt die benutzten Befehle
    const stringCommandUse = 'LOG: ' + misc.data.ermittleZeitpunkt(misc.data.ermittleTag(), 
    misc.data.ermittleUhrzeit()) + ' - ' +  message.author.tag + ' hat den Befehl ' + 
    command + ' benutzt.';

    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore

    // --- Befehle ---

    if (command === 'version') {
        console.log(stringCommandUse);
        message.channel.send('Version: `' + misc.data.zeigeVersion() + '`');
    }

    if (command === 'ladder') {
        console.log(stringCommandUse);
        if (!args.length) {
            return message.channel.send('Du hast keine Argumente mit geben, ' + message.author);
        }
        ladder.data.ladder(args);
    }

    if (command === 'top') {
        console.log(stringCommandUse);
    }

    if (command === 'server') {
        console.log(stringCommandUse);
    }

    if (command === 'hilfe') {
        console.log(stringCommandUse);
    }

});

client.login(token.id);