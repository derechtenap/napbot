'use strict';

const profiles = require('./profiles.json');
const fetch = require('node-fetch');
const { statsAPIURL } = require('./config.json');

var id = 0;

// Stats methods ---------------------------------------------------------
var methods = {
    getStats: async function getStats(ladder, name) {
        let leaderboard = getLadder(ladder.toLowerCase());
        if(checkProfiles(name) === false) {
            return -1;
        }

        // Getting the data ...
        let aoeID = profiles.array[id].aoe2net;
        const requestURL = statsAPIURL + '&leaderboard_id=' + 
        leaderboard + '&profile_id=' + aoeID;

        console.log(requestURL);

        try {
            let res = await fetch(requestURL);
            return await res.json();
        } catch (err) {
            console.error(err);
        }
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

exports.data = methods;