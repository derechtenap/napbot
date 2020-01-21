// napbot - AOE2 Statistik-Bot
// @derechtenap
// 16.01.2020

/**
*
    misc.js
    ------------------------------------------------
    Enthält kleine Funktionen.
    ------------------------------------------------
*
**/

const configPath = require('./config.json');

var methoden = {

    // --- Version ---

    zeigeVersion: function zeigeVersion() {
        const config = configPath;
        return config.version;
    },

    // --- Zeit ---

    ermittleTag: function ermittleTag() {
        var heute = new Date(), tag = String(heute.getDate()).padStart(2, '0'),
        monat = String(heute.getMonth() + 1).padStart(2, '0'), jahr = heute.getFullYear();
        return heute = tag + '.' + monat + '.' + jahr;
    },

    ermittleUhrzeit: function ermittleUhrzeit() {
        var uhrzeit = new Date(), stunden = String(uhrzeit.getHours()).padStart(2, '0'), 
        minuten = String(uhrzeit.getMinutes()).padStart(2, '0'), 
        sekunden = String(uhrzeit.getSeconds()).padStart(2, '0');
        return uhrzeit = stunden + ':' + minuten + ':' + sekunden;
    },

    ermittleZeitpunkt: function ermittleZeitpunkt(tag, uhrzeit) {
        return tag + ' - ' + uhrzeit;
    }
}

exports.data = methoden;