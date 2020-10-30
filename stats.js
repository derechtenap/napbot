'use strict';

const profiles = require('./profiles.json');
const fetch = require('node-fetch');
const { statsAPIURL } = require('./config.json');

var id = 0, storedData = null;

// Stats methods ---------------------------------------------------------
var methods = {
    getStats: async function getStats(ladder, name) {
        let leaderboard = getLadder(ladder.toLowerCase());
        if(checkProfiles(name) === false) {
            return -1;
        }

        // Getting the data ...
        storedData = await getData(id, leaderboard);
        console.log(storedData);

        // TODO: How return this data???
        // Returns atm [object Promise]
        // Console.log works...
        return storedData.last_match; // Should return Unix-time...
    }
}

// Helper functions ------------------------------------------------------
function getLadder(ladder) {
    switch (ladder) {
        case 'unr':
            return 0;
        case 'dm':
            return 1;
        case 'tdm':
            return 2;
        case 'rm':
            return 3;
        case 'trm':
            return 4;
        default:
            return -1;
    }
}

function checkProfiles(name) {
    for (let i = 0; i < profiles.array.length; i++) {
        if (profiles.array[i].name.includes(name)) {
            id = i;
            return true;
        }
    }
    return false;
}

async function getData(id, leaderboard) {
    let aoeID = profiles.array[id].aoe2net, stats = null;
    const data = await fetch(statsAPIURL + '&leaderboard_id=' + 
    leaderboard + '&profile_id=' + aoeID)
    .then(response => response.json());
    stats = data.leaderboard[0];
    return stats;
}

exports.data = methods;