'use strict';

const { version } = require('./config.json'); 

// Misc methods ----------------------------------------------------------
var methods = {
    version: function displayVersion() {
        return version;
    }
}

exports.data = methods;