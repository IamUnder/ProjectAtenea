const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test!'),
    async execute(client, interaction) {
        await interaction.reply('Jiji testing!')
    }
}