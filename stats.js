'use strict';

const fetch = require('node-fetch');
const {
    statsAPIURL
} = require('./config.json');

var id = 0;

// Stats methods ---------------------------------------------------------
var methods = {
    getStats: async function getStats(ladder, name) {
        let leaderboard = getLadder(ladder.toLowerCase());

        // Getting the data ...
        const requestURL = statsAPIURL + '&leaderboard_id=' +
            leaderboard + '&search=' + name;

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

// TODO: Deathmatch Ladders seems to be removed in the near feature. I need  
// to update function then...
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

exports.data = methods;