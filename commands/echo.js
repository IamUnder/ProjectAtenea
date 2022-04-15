const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Reply your input!')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('the input to echo back')
            .setRequired(false)),
    async execute(client, interaction) {
        if (!interaction.options) {
            var arg = interaction.content.slice(client.prefix.length).trim().split(/ +/g)
            arg.shift()
            var input = arg.join(' ')
            interaction.reply(input)
        } else {
            if (!interaction.options.getString('input')) {
                interaction.reply('falta argumento')
                console.log(interaction.content);
            } else {
                await interaction.reply(interaction.options.getString('input'))
            }
        }
    }
}