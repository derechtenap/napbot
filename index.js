'use strict';

// DiscordJS und Fetch ---------------------------------------------------
const Discord = require('discord.js');

const client = new Discord.Client();

const misc = require('./misc.js');
const stats = require('./stats.js');

// Config and Token
const { prefix, language, commandList } = require('./config.json');
const TOKEN = require('./token.json');

// Langauge Strings
const strings = require(`./lang/${language}.json`);


// Client on ready -------------------------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set bot status
  client.user.setActivity('.version',  {
      type: 'WATCHING'
  }).catch(console.error);
});

// Client on message -----------------------------------------------------
client.on('message', message => {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    // Ignore messages without prefix and bot messages...
    if (!message.content.startsWith(prefix) || message.author.bot) return; 

    if (commandList.includes('version') && command === 'version') {
        message.reply('`' + misc.data.version() + '`');
    }

    if (commandList.includes('profiles') && command === 'profiles') {
        message.reply('ich habe diese Profile gefunden:');
        message.channel.send('`' + misc.data.profiles() + '`');   
    }

    if (commandList.includes('stats') && command === 'stats') {
        if (args.length < 2) {
            message.reply(strings.err_missing_parameter +
            ` → ${prefix}help`);
        } else {
            stats.data.getStats(args[0], args[1]).then(
                ret => {

                if (ret.leaderboard != []) {

                    // TODO: Remove log
                    console.log(ret);

                    // Set Prefix 
                    const stat = ret.leaderboard[0];
                    const totalPlayers = ret.total;

                    // Create an embed Message
                    const embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Statistiken von ${stat.name}`)
                    .setURL() // Currently empty
                    // Usage: 'name', 'icon', 'url'
                    .setAuthor('napBot', '', '')
                    .setDescription()
                    .setThumbnail()
                    .addFields(
                        {
                            name: 'MMR \n(Aktuell)',
                            value: stat.rating,
                            inline: true
                        },
                        {
                            name: 'MMR \n(Rekord)',
                            value: stat.highest_rating,
                            inline: true
                        },
                        {
                            name: 'MMR \n(Letztes Spiel)',
                            value: (stat.rating - stat.previous_rating),
                            inline: true
                        },
                        {
                            name: 'Rang',
                            value: `Platz ${stat.rank} von ${totalPlayers} Spielern`,
                            inline: false
                        }
                    )
                    .addFields(
                        {
                            name: 'Spiele',
                            value: stat.games,
                            inline: true
                        },
                        {
                            name: 'Siege',
                            value: stat.wins,
                            inline: true
                        },
                        {
                            name: 'Niederlagen',
                            value: stat.losses,
                            inline: true
                        },
                        {
                            name: 'Drops',
                            value: stat.drops,
                            inline: true
                        },
                        {
                            name: 'Aktuelle Streak',
                            value: stat.streak,
                            inline: true
                        }
                    )
                    .setTimestamp()
                    .setFooter(
                        'Statistken von aoe2.net', 
                        // TODO: Remove Placeholder
                        'https://aoe2.net/assets/images/125504a37739b91c50d3c1673bfb00a3-favicon.png'
                    );

                    message.channel.send(embed);
                } else {
                message.channel.send(strings.err_no_data);
                }
            }

            );
        }
    }
});

client.login(TOKEN.id);