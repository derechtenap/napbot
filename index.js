const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var username;
var ausgabe;

const HTTP = new XMLHttpRequest();
const url = 'https://aoe2.net/leaderboard/aoe2de/rm-1v1?search[value]=Mond2001'; // Später value=username

const client = new Discord.Client();

client.once('ready', () => {
    //console.log('\n' + client.user.tag + ' wurde geladen! napbot ist bereit\nDer Bot ist mit diesen Servern verbunden: ');
    //client.guilds.forEach((guild) => {
    //    console.log('- ' + guild.name)
    //})
    client.user.setActivity('Wieder da!', {
        type: 'WATCHING'
    })
});

client.on('message', message => {

    if (message.content === config.prefix + 'ladder') {
        HTTP.open("GET", url);
        HTTP.send();

        HTTP.onreadystatechange = (e) => {
           console.log(HTTP.responseText);
        }
    }
});

client.login(token.id);