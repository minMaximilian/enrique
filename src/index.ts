import { Client, Intents } from 'discord.js';

const client = new Client({
	intents: Intents.FLAGS.GUILDS
})

client.login(process.env.TOKEN)