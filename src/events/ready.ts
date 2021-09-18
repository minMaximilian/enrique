import { ApplicationCommand, Client, Collection, GuildResolvable } from "discord.js";


export const ready = async (client: Client) => {
    client.user?.setPresence({
        activities: [{ name: `stratagem.games\nCurrently in ${client.guilds.cache.size} servers`, type: 'PLAYING' }], status: 'online' 
    })

    commands = await client.application?.commands.fetch()

    console.log('Ready to rock and roll')

    return
}

export let commands: Collection<string, ApplicationCommand<{ guild: GuildResolvable; }>> | undefined