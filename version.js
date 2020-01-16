var methoden = {
 zeigeVersion: function zeigeVersion() {
    const config = require('./config.json');
    return config.version;
}
}
exports.data = methoden;