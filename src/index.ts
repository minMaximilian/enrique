import { Client, Intents } from 'discord.js';
import executeCommands from './events/executeCommands';
import { ready } from './events/ready';
import registerCommands from './events/registerCommands';

const client = new Client({
	intents: Intents.FLAGS.GUILDS
})

client.once('ready', ready)

client.on('interactionCreate', executeCommands);

client.on('guildCreate', registerCommands)

client.login(process.env.TOKEN)

export default client