// \n_ _ = Leerzeile

const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
const prefix = config.prefix;

var urlRM = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=';
var steamIcon = 'https://vignette.wikia.nocookie.net/ageofempires/images/a/ad/AoEIIDE_icon.png/revision/latest?cb=20191107172622'; // TODO Steam API für Profilbilder
var iconAoeNET = 'https://aoe2.net/assets/images/125504a37739b91c50d3c1673bfb00a3-favicon.png';

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

function checkClan(c) {
    if (c === null) {
        return "_Kein Clan_";
    }
    return c;
}

function ladeDaten() {

    // TODO Auslagern des Requests

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
                    var siegProzent = ((stat.wins / stat.games)*100).toFixed(1) + '%';

                    //message.channel.send('**Statistiken von ' + stat.name + ' (Rangliste: RM)**\nClan: ' + 
                    //checkClan(stat.clan) + '\nRang: ' + stat.rank + ' von ' + resObj.total + 
                    //' Spielern (Top: ' + ladderProzent(platzProzent) + '%)\nELO: ' + stat.rating + 
                    //' (Rekord: ' + stat.highest_rating + ')\nAktuelle Streak: ' + stat.streak + '\nSpiele: ' + 
                    //stat.games + ' (Siege: ' + stat.wins + ' | Niederlagen: ' + stat.losses + ' | Drops: ' + 
                    //stat.drops + ')'  + '\nLetztes Spiel: ' + ermittleZeit(stat.last_match) + ' (' + stat.last_match + ')');

                    const embedRM = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(stat.name + ' - Clan: ' + checkClan(stat.clan)) // USERNAME
                    .setURL('')
                    .setAuthor('Statistken - Zufallskarten-Rangliste (RM)', steamIcon, '')
                    .setDescription('')
                    .setThumbnail(steamIcon)
                    .addField('ELO', stat.rating,  true)
                    .addField('Spiele', stat.games,  true)
                    .addField('Siege', stat.wins,  true)
                    .addField('Niederlagen', stat.losses,  true)
                    .addField('Drops', stat.drops, true)
                    .addField('Siege in %', siegProzent, true)
                    .addField('Aktuelle Streak', stat.streak, true)
                    .addField('Höchste ELO', stat.highest_rating, true)
                    .addBlankField()
                    .addField('Rang', stat.rank + '/' + resObj.total, true)
                    .addField('Letztes Spiel', ermittleZeit(stat.last_match), true)
                    .setTimestamp()
                    .setFooter('Statistken von aoe2.net', iconAoeNET);

                    message.channel.send(embedRM);

                } catch (e) {
                    console.warn('Fehler: ' + e);
                    message.channel.send(':warning: **Ups! Also irgendwas ist schiefgelaufen.**\n' + 
                    'Wahrscheinlich gibt es den Spieler in dieser Rangliste nicht oder der Server hat' + 
                    ' nicht geantwortet ...');
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