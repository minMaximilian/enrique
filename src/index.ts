import { Client, Intents } from 'discord.js';
import { commands } from './commands/index';

const client = new Client({
	intents: Intents.FLAGS.GUILDS
})

client.once('ready', () => {
	client.user?.setPresence({
		activities: [{ name: `stratagem.games\nCurrently in ${client.guilds.cache.size} servers`, type: 'PLAYING' }], status: 'online' 
	})
	console.log('Ready to rock and roll');
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN)