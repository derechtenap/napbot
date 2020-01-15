// \n_ _ = Leerzeile

const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
const prefix = config.prefix;

var urlRM = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=';

const client = new Discord.Client();

// Functions

function ermittleZeit(t) {
    var a = new Date(t * 1000);
    var months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = '0' + a.getHours();
    var min = '0' + a.getMinutes();
    var sec = '0' + a.getSeconds();
    var time = date + '. ' + month + ' ' + year + ' - ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2);
    return time;
}

function ladderProzent(v) {
    v = (v * 100).toFixed(2);

    if (v < 0.000) {
        return "0.001";
    }
    return v;
}

client.once('ready', () => {
    console.log('\n' + client.user.tag + ' wurde geladen! napbot ist bereit\nDer Bot ist mit diesen Servern verbunden: ');
    client.guilds.forEach((guild) => {
        console.log('- ' + guild.name)
    })

    client.user.setActivity('Wieder da!', {
        type: 'WATCHING'
    })
});

client.on('message', message => {

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot) return; // Ignore

    if (command === 'rm') {
    if (!args.length) {
        return message.channel.send('Dieser Befehl benötigt Argumente, ' + message.author + '!');
    }

        xhr.onload = function () {
            if (this.status === 200) {
                try {
                    const resObj = JSON.parse(this.responseText);
                    const stat = resObj.leaderboard[0];
                    var platzProzent = stat.rank / resObj.total;

                    console.warn(platzProzent);

                    message.channel.send('**Statistiken von ' + stat.name + ' (Rangliste: RM)**\nClan: ' + 
                    stat.clan + '\nRang: ' + stat.rank + ' von ' + resObj.total + 
                    ' Spielern (Top: ' + ladderProzent(platzProzent) + '%)\nELO: ' + stat.rating + 
                    ' (Rekord: ' + stat.highest_rating + ')\nAktuelle Streak: ' + stat.streak + '\nSpiele: ' + 
                    stat.games + ' (Siege: ' + stat.wins + ' | Niederlagen: ' + stat.losses + ' | Drops: ' + 
                    stat.drops + ')'  + '\nLetztes Spiel: ' + ermittleZeit(stat.last_match) + ' (' + stat.last_match + ')');

                    console.log(ermittleZeit(stat.last_match));
                } catch (e) {
                    console.warn('Fehler: ' + e);
                    message.channel.send(':warning: **Ups! Also irgendwas ist schiefgelaufen.**\n' + 
                    'Wahrscheinlich gibt es den Spieler in dieser Rangliste nicht oder der Server hat' + 
                    'nicht geantwortet ...');
                }

            } else {
                console.warn('Keine Daten erhalten!');
            }

        };

        xhr.open('GET', urlRM + args);
        xhr.send(null);

    }

    // TODO Neue Funktion - .spieler - Zeigt aktuelle Spieleranzahl an.
    // message.channel.send('Aktuell sind `' + resObj.total + '` Spieler in der Rangliste 1vs1-Zufallskarte eingetragen.');

    // TODO Neue Funktion - .top - Zeigt Top 3 Spieler an

});

client.login(token.id);