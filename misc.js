'use strict';

const CONFIG = require('./config.json'); 

var methods = {
    version: function displayVersion() {
        return CONFIG.version;
    }
}

exports.data = methods;