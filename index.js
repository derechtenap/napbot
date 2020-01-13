const Discord = require("discord.js");
const token = require("./token.json");
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.login(token.id);