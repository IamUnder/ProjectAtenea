const { SlashCommandBuilder } = require('@discordjs/builders')
const msg = "test!"

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('test!'),
    async execute(client, interaction) {
        if (interaction.content === undefined) {
            return interaction.reply(msg)
        } else {
            const channel = client.channels.cache.get(interaction.channelId)
            await channel.send(msg)
        }
    }
}