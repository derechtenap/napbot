const Discord = require('discord.js');
const token = require('./token.json');
const config = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var url = 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=Mond2001'; // Später search=username

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

    if (message.content === config.prefix + 'spieler') {

        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.status === 200) {
                try {
                    const resObj = JSON.parse(this.responseText);
                    console.log(resObj.total); // Gibt Anzahl der Spieler wieder...

                    message.channel.send('Aktuell sind `' + resObj.total + '` Spieler in der Rangliste 1vs1-Zufallskarte eingetragen.');
                } catch (e) {
                    console.warn('JSON konnte nicht geparsed werden!');
                }
                console.log(this.responseText);
            } else {
                console.warn('Keine Daten erhalten!');
            }
        };

        xhr.open('GET', 'https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&search=Mond2001');
        xhr.send(null);

    }

});



client.login(token.id);