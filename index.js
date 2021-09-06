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
    commandList,
    numberFormat
} = require('./config.json');
const TOKEN = require('./token.json');

// Langauge Settings
const STRINGS = require(`./lang/${language}.json`);
const NUMBER_FORMAT = numberFormat;

// Reaction Emoji
// If a player search finds more than one player, these
// Emojis are used to select the desired player.
const REACTION_EMOJI = [
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
    '🔟'
];

// Client on ready -------------------------------------------------------
client.on('ready', () => {
    console.log(STRINGS.login_info + ` ${client.user.tag}!`);

    // Set bot status
    client.user.setActivity('.version', {
        type: 'WATCHING'
    }).catch(console.error);
});

// Client on message -----------------------------------------------------
client.on('message', message => {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    // Tracks used commands
    // Substring to remove the prefix
    if (message.content.startsWith(prefix) && commandList.includes((message.content).substring(1))) {

        let time = new Date().getTime();
        let user = message.author.tag;
        let content = message.content
        let server = message.channel.guild.name;

        console.info(`${time} --- ${user} used ${content} on ${server}`);
    }

    // Ignore messages without prefix and bot messages...
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    if (commandList.includes('version') && command === 'version') {
        message.reply('`' + misc.data.version() + '`');
    }

    if (commandList.includes('stats') && command === 'stats') {
        if (args.length < 2) {
            message.reply(`${STRINGS.err_missing_parameter} → ${prefix}help`);
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
                                name: STRINGS.aoe_stat_rating,
                                value: stat.rating,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_highest_rating,
                                value: stat.highest_rating,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_rating_last_game,
                                value: (stat.rating - stat.previous_rating),
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_rank,
                                value: `Platz ${stat.rank.toLocaleString(NUMBER_FORMAT)} von ${totalPlayers.toLocaleString(NUMBER_FORMAT)} Spielern`,
                                inline: false
                            })
                            .addFields({
                                name: STRINGS.aoe_stat_games,
                                value: stat.games,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_wins,
                                value: stat.wins,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_losses,
                                value: stat.losses,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_drops,
                                value: stat.drops,
                                inline: true
                            }, {
                                name: STRINGS.aoe_stat_streak,
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
                            embed.setTitle(`${STRINGS.aoe_stat_title} [${displayClan}] ${stat.name}`)
                        } else {
                            embed.setTitle(`${STRINGS.aoe_stat_title} von ${stat.name}`)
                        }

                        message.channel.send(embed);
                    } else if (ret.count > 1) {

                        const embed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .attachFiles('./icon.jpg')
                            .attachFiles('./icon-aoe2net.png')
                            // Usage: 'name', 'icon', 'url'
                            .setAuthor('napbot', 'attachment://icon.jpg', '')
                            .setDescription(STRINGS.aoe_stat_profile_selection)
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
                                        name: STRINGS.aoe_stat_rating,
                                        value: stat.rating,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_highest_rating,
                                        value: stat.highest_rating,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_rating_last_game,
                                        value: (stat.rating - stat.previous_rating),
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_rank,
                                        value: `Platz ${stat.rank.toLocaleString(NUMBER_FORMAT)} von ${totalPlayers.toLocaleString(NUMBER_FORMAT)} Spielern`,
                                        inline: false
                                    })
                                    .addFields({
                                        name: STRINGS.aoe_stat_games,
                                        value: stat.games,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_wins,
                                        value: stat.wins,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_losses,
                                        value: stat.losses,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_drops,
                                        value: stat.drops,
                                        inline: true
                                    }, {
                                        name: STRINGS.aoe_stat_streak,
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
                                    embed.setTitle(`${STRINGS.aoe_stat_title} [${displayClan}] ${stat.name}`)
                                } else {
                                    embed.setTitle(`${STRINGS.aoe_stat_title} von ${stat.name}`)
                                }

                                message.channel.send(embed);
                            })
                        });
                    }
                    if (ret.count <= 0) {
                        message.channel.send(STRINGS.err_no_data);
                    }
                }

            );
        }
    }
});

client.login(TOKEN.id);