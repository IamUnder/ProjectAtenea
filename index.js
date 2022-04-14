const { Client, Intents } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.once('ready', () => {
    console.log('Ready!')
})

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand) return

    const { commandName } = interaction

    if(commandName === 'ping') {
        interaction.reply('Pong!')
    } else if (commandName === 'server') {
        interaction.reply(`Server: ${interaction.guild.name} \nTotal members: ${interaction.guild.memberCount}`)
    } else if (commandName === 'user') {
        interaction.reply(`User info. \nTag: ${interaction.user.tag}\nID: ${interaction.user.id}`)
    }

})

client.login(process.env.TOKEN)