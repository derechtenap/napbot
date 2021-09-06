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

// Converts the User Input into the required leaderboard ID
// Unranked = 0; 1v1 Deathmatch = 1; Team Deathmatch = 2;
// 1v1 Random Map = 3; Team Random Map = 4; 1v1 Empire Wars = 13;
// Team Empire Wars = 14;
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
        case 'emp':
            return 13;
        case 'tem':
            return 14;
        default:
            return -1;
    }
}

exports.data = methods;