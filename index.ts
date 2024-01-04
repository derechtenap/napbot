import Discord from "discord.js"
import * as dotenv from "dotenv"

dotenv.config()

// How to pass default config? 
const botClient = new Discord.Client({
    intents: []
});

botClient.on("ready", () => {
    console.info("Bot is ready!")
})

botClient.login(process.env.TOKEN)