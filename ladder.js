// napbot - AOE2 Statistik-Bot
// @derechtenap
// 19.01.2020

/**
*
    ladder.js
    ------------------------------------------------
    Funktionen, welche für den .ladder Befehl be-
    nötigt werden.
    ------------------------------------------------
*
**/

const configPath = require('./config.json');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

var methoden = {

    // -- .ladder -- 

    ladder: function ausgabeDaten(args) {
  
        // -- XMLRequest --

            let config = configPath;
            var ladderID = args[0], player = args[1];

            ladderID = ermittleRangliste(ladderID);

            console.log('ladderID= ' + ladderID + ',player= ' + player);
            xhr.onload = function () {
                if (this.status === 200) {
                    try {
                        var daten = JSON.parse(this.responseText);
                        var ausgabe = daten.leaderboard[0];
                        console.log('>>>>' + ausgabe.name);
                        return ausgabe;
                    } catch (e) {
                        console.warn('Fehler: ' + e);
                        return ':warning: Ups! **Ups! Also irgendwas' +
                            'ist schiefgelaufen.**\n Wahrscheinlich gibt es ' +
                            'den Spieler in dieser Rangliste nicht oder der ' +
                            'Server hat nicht geantwortet ...';
                    }

                } else {
                    console.warn('Keine Daten erhalten!');
                }

            }
            console.log(config.urlAPI + ladderID + '&search=' + player);
            xhr.open('GET', config.urlAPI + ladderID + '&search=' + player);
            xhr.send(null);

            // -- Ermittelt die gewählte Rangliste

            function ermittleRangliste(id) {
                if (id === 'unr' || id === '0') {
                    console.log('UNRANKED!');
                    return 0;
                }
                if (id === 'dm' || id === '1') {
                    console.log('DEATHMATCH!');
                    return 1;
                }
                if (id === 'tdm' || id === '2') {
                    console.log('TEAM DEATHMATCH');
                    return 2;
                }
                if (id == 'rm' || id === '3') {
                    console.log('RANDOM MAP');
                    return 3;
                }
                if (id == 'trm' || id === '4') {
                    console.log('TEAM RANDOM MAP');
                    return 4;
                }
                console.warn('FEHLER BEI DER LADDER AUSWAHL!')
                return -1;
            }

    }


}

exports.data = methoden;