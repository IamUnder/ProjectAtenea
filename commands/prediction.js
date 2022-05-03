const { SlashCommandBuilder } = require('@discordjs/builders')
const Prediction = require('../models/prediction')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('crear la apuesta')
        .addStringOption(option =>
            option.setName('titulo de la apuesta')
            .setDescription('titulo que tendra la apuesta')
            .setRequired(false)),
    async execute(client, interaction) {
        if (!interaction.options) {
            var arg = interaction.content.slice(client.prefix.length).trim().split(/ +/g)
            arg.shift()
            var prediction = arg.join(' ')
            // Si no hay comando no se debe hacer nada
            if (prediction.length === 0) {
                return interaction.reply('No has introducido ningun titulo')
            }
            // Insertamos la apuesta en la base de datos
            const id = insertPrediction(interaction.author.id, interaction.guild.id, prediction)

            interaction.reply('Apuesta creada con exito, el id de la apuesta es: ' + id)
        } //else {
        //     if (!interaction.options.getString('input')) {
        //         interaction.reply('falta argumento')
        //         console.log(interaction.content);
        //     } else {
        //         await interaction.reply(interaction.options.getString('input'))
        //     }
        // }
    }
}

// Funcion para obtener el hash de la apuesta
function getHash() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Funcion para insertar una apuesta en la base de datos
function insertPrediction(user_id, guild_id, prediction) {
    const hash = getHash()
    Prediction.create({
        id: hash,
        user_id: user_id,
        guild_id: guild_id,
        prediction: prediction
    })

    return hash
}

