'use strict';

// DiscordJS und Fetch ---------------------------------------------------
const Discord = require('discord.js');

const client = new Discord.Client();

const misc = require('./misc.js');
const stats = require('./stats.js');

// Config and Token
const {
    prefix,
    language,
    commandList
} = require('./config.json');
const TOKEN = require('./token.json');

// Langauge Strings
const strings = require(`./lang/${language}.json`);

// Client on ready -------------------------------------------------------
client.on('ready', () => {
    console.log(strings.login_info + ` ${client.user.tag}!`);

    // Set bot status
    client.user.setActivity('.version', {
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

    if (commandList.includes('stats') && command === 'stats') {
        if (args.length < 2) {
            message.reply(strings.err_missing_parameter +
                ` → ${prefix}help`);
        } else {
            stats.data.getStats(args[0], args[1]).then(
                ret => {

                    if (ret.count === 1) {
                        // Set Prefix 
                        const stat = ret.leaderboard[0];
                        const totalPlayers = ret.total;
                        // Create an embed Message
                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .attachFiles('./icon.jpg')
                            .attachFiles('./icon-aoe2net.png')
                            // Usage: 'name', 'icon', 'url'
                            .setAuthor('napbot', 'attachment://icon.jpg', '')
                            .setDescription('')
                            .setThumbnail()
                            .addFields({
                                name: strings.aoe_stat_rating,
                                value: stat.rating,
                                inline: true
                            }, {
                                name: strings.aoe_stat_highest_rating,
                                value: stat.highest_rating,
                                inline: true
                            }, {
                                name: strings.aoe_stat_rating_last_game,
                                value: (stat.rating - stat.previous_rating),
                                inline: true
                            }, {
                                name: strings.aoe_stat_rank,
                                value: `Platz ${stat.rank.toLocaleString('de-DE')} von ${totalPlayers.toLocaleString('de-DE')} Spielern`,
                                inline: false
                            })
                            .addFields({
                                name: strings.aoe_stat_games,
                                value: stat.games,
                                inline: true
                            }, {
                                name: strings.aoe_stat_wins,
                                value: stat.wins,
                                inline: true
                            }, {
                                name: strings.aoe_stat_losses,
                                value: stat.losses,
                                inline: true
                            }, {
                                name: strings.aoe_stat_drops,
                                value: stat.drops,
                                inline: true
                            }, {
                                name: strings.aoe_stat_streak,
                                value: stat.streak,
                                inline: true
                            })
                            .setTimestamp()
                            .setFooter(
                                'Statistken von aoe2.net',
                                'attachment://icon-aoe2net.png'
                            );

                        let displayClan = '';

                        if (stat.clan !== null) {
                            displayClan = stat.clan;
                            embed.setTitle(`${strings.aoe_stat_title} [${displayClan}] ${stat.name}`)
                        } else {
                            embed.setTitle(`${strings.aoe_stat_title} von ${stat.name}`)
                        }

                        message.channel.send(embed);
                    } else if (ret.count > 1) {

                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .attachFiles('./icon.jpg')
                            .attachFiles('./icon-aoe2net.png')
                            // Usage: 'name', 'icon', 'url'
                            .setAuthor('napbot', 'attachment://icon.jpg', '')
                            .setDescription(strings.aoe_stat_title)
                            .setThumbnail()
                            .setTimestamp()
                            .setFooter(
                                'Statistken von aoe2.net',
                                'attachment://icon-aoe2net.png'
                            );

                        ret.leaderboard.forEach(element => {
                            embed.addField('Spieler', element.name, false);
                        });
                        message.channel.send(embed).then(async addReaction => {
                            for (let i = 0; i < ret.leaderboard.length; i++) {
                                if (i < REACTION_EMOJI.length) {
                                    await addReaction.react(REACTION_EMOJI[i]);
                                }
                            }

                            await addReaction.awaitReactions((reaction) => REACTION_EMOJI.includes(reaction.emoji.name), {
                                max: 1
                            }).then(collected => {

                                const stat = ret.leaderboard[REACTION_EMOJI.indexOf(collected.first().emoji.name)];
                                const totalPlayers = ret.total;
                                // Create an embed Message
                                const embed = new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .attachFiles('./icon.jpg')
                                    .attachFiles('./icon-aoe2net.png')
                                    // Usage: 'name', 'icon', 'url'
                                    .setAuthor('napbot', 'attachment://icon.jpg', '')
                                    .setDescription('')
                                    .setThumbnail()
                                    .addFields({
                                        name: strings.aoe_stat_rating,
                                        value: stat.rating,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_highest_rating,
                                        value: stat.highest_rating,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_rating_last_game,
                                        value: (stat.rating - stat.previous_rating),
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_rank,
                                        value: `Platz ${stat.rank.toLocaleString('de-DE')} von ${totalPlayers.toLocaleString('de-DE')} Spielern`,
                                        inline: false
                                    })
                                    .addFields({
                                        name: strings.aoe_stat_games,
                                        value: stat.games,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_wins,
                                        value: stat.wins,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_losses,
                                        value: stat.losses,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_drops,
                                        value: stat.drops,
                                        inline: true
                                    }, {
                                        name: strings.aoe_stat_streak,
                                        value: stat.streak,
                                        inline: true
                                    })
                                    .setTimestamp()
                                    .setFooter(
                                        'Statistken von aoe2.net',
                                        'attachment://icon-aoe2net.png'
                                    );

                                let displayClan = '';

                                if (stat.clan !== null) {
                                    displayClan = stat.clan;
                                    embed.setTitle(`${strings.aoe_stat_title} [${displayClan}] ${stat.name}`)
                                } else {
                                    embed.setTitle(`${strings.aoe_stat_title} von ${stat.name}`)
                                }

                                message.channel.send(embed);
                            })
                        });
                    }
                    if (ret.count <= 0) {
                        message.channel.send(strings.err_no_data);
                    }
                }

            );
        }
    }
});

client.login(TOKEN.id);