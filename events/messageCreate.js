module.exports = {
    name: 'messageCreate',
    async execute (client, message) {
        if (!message.content.startsWith(client.prefix)) return

        const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        // Si no hay comando no se debe hacer nada
        if (cmd.length === 0) return;

        // Buscamos el comando
        let command = client.commands.get(cmd);
        if (!command) return // No devolvemos nada al no encontrase el comando
        command.execute(client, message)
        
    }
}