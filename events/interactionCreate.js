module.exports = {
    name: 'interactionCreate',
    async execute (client, interaction) {
        if (!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)

        if (!command) return

        try {
            await command.execute(client, interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply('An error occurred while executing that command.')
        }

    }
}