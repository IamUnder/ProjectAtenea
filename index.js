const fs = require('node:fs')
const { Client, Collection, Intents } = require('discord.js')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

// Initialize the database
const url = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@proyectatenea.3jihx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( () => console.log('Base de datos contectada') ).catch( e => console.log('Error en la conexion: ', e) )


client.commands = new Collection()
client.prefix = process.env.PREFIX
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args))
    }
}


client.login(process.env.TOKEN)