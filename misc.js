'use strict';

const {
    version
} = require('./config.json');

// Misc methods ----------------------------------------------------------
var methods = {
    profiles: function displayProfiles() {
        let names = "";

        for (let i = 0; i < profiles.array.length; i++) {
            names += `${profiles.array[i].name} ` +
                `(${profiles.array[i].steam_id})\n`;
        }
        return names;
    },

    version: function displayVersion() {
        return version;
    }
}

exports.data = methods;