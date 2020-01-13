const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var username, ausgabe;

var jsonData = {};

const HTTP = new XMLHttpRequest();
const url = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=Mond2001'; // Später search=username

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
        HTTP.onreadystatechange = function () {
            if (HTTP.readyState < 4) {
                console.log('Erwarte Daten...');
            } else if (HTTP.readyState === 4) {
                if (HTTP.status == 200 && HTTP.status < 300) {
                    var json = JSON.parse(HTTP.responseText);
                    console.log(json);
                    act_on_response(json);
                }
            } else {
                console.log('FEHLER!');
            }
        }

        HTTP.open('GET', url, true);
        HTTP.responseTpye = 'text';
        HTTP.send(null);
    }

    function act_on_response(res) {
        jasonData = res;
        console.log(jsonData); // Return aktuell = {}
    }

});



client.login(token.id);