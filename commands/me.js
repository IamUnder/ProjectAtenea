const { SlashCommandBuilder } = require('@discordjs/builders')
const User = require('../models/user')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('me')
        .setDescription('Te dice los puntos que tienes '),
    async execute(client, interaction) {

        // Establecemos las variables en funcion de como se esta ejecutando el comando
        var id = ''
        var guild_id = interaction.guild.id
        var username = ''
        if (interaction.user) {
            id = interaction.user.id
            username = interaction.user.username
        } else {
            id = interaction.author.id
            username = interaction.author.username
        }

        // Buscamos el usuario en la base de datos
        var user = await User.findOne({id: id, guild_id: guild_id})
        if (!user) {
            await User.create({
                id: id,
                guild_id: guild_id,
                points: 300
            })
            user = await User.findOne({id: id, guild_id: guild_id})
            return interaction.reply(`Hola ${username}, te has registrado y has obtenido 300 puntos gratis.`)
        }
        return interaction.reply('Hola ' + username + ', tienes ' + user.points + ' puntos.')
    }
}