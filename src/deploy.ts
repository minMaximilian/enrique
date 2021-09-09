import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './commands/index';

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!);

const appCom = [];

for (const command of commands) {
    appCom.push(command[1].data.toJSON())
}

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

        if (process.env.PRODUCTION != 'True') {
            console.log('Not running in production')
		    await rest.put(
		    	Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
		    	{ body: appCom },
		    );
        } else {
            console.log('Running in Production')
            await rest.put(
		    	Routes.applicationCommands(process.env.CLIENT_ID!),
		    	{ body: appCom },
		    );
        }

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();