const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

var urlRM = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search='; // TODO search=username

const client = new Discord.Client();

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

    if (message.content === config.prefix + 'mond') { // TODO Statt mond .mond + {var}
        xhr.onload = function () {
            if (this.status === 200) {
                try {
                    const resObj = JSON.parse(this.responseText);
                    const stat = resObj.leaderboard[0];

                    message.channel.send(':warning: Nur ein kleiner Test. Bald können alle Spieler abgefragt werden :)\n_ _'); // \n_ _ = Leerzeile
                    message.channel.send('**' + stat.name + 's Statistiken**\nClan: ' + stat.clan + '\nRang: ' + stat.rank + ' von ' + resObj.total + ' Spielern\nELO: ' + stat.rating + ' (Rekord: ' + stat.highest_rating + ')\nAktuelle Streak: ' + stat.streak + '\nSpiele: ' + stat.games + ' (Siege: ' + stat.wins + ' | Niederlagen: ' + stat.losses + ' | Drops: ' + stat.drops + ')' + '\nLetztes Spiel: ' + stat.last_match);

                } catch (e) {
                    console.warn('Fehler' + e);
                }

            } else {
                console.warn('Keine Daten erhalten!');
            }
        };

        xhr.open('GET', 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=Mond2001');
        xhr.send(null);

    }

    // TODO Neue Funktion - .spieler - Zeigt aktuelle Spieleranzahl an.
    // message.channel.send('Aktuell sind `' + resObj.total + '` Spieler in der Rangliste 1vs1-Zufallskarte eingetragen.');

    // TODO Neue Funktion - .top - Zeigt Top 3 Spieler an

});

client.login(token.id);