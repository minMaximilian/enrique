import { ApplicationCommandPermissionData, Guild, PermissionOverwriteManager, Permissions } from "discord.js";
import client from "..";
import { commands } from "./ready";

const userCommands = ['signup', 'withdraw']

export default async (guild: Guild) => {
    client.user?.setPresence({
		activities: [{ name: `Currently in ${client.guilds.cache.size} servers`, type: 'PLAYING' }], status: 'online' 
	})
    
    const owner = await guild.fetchOwner()
    let r = await guild.roles.fetch()
    r = r.filter((key, _) => key.permissions.has(Permissions.FLAGS.ADMINISTRATOR))

    let fullPerms: ApplicationCommandPermissionData[] = [
            {
                id: owner.id,
                type: 'USER',
                permission: true  
            }
    ]

    for (let role of r) {
        fullPerms.push({
            id: role[1].id,
            type: 'ROLE',
            permission: true
        })
    }

    for (let i of commands!) {
        if (!i[1].defaultPermission && !userCommands.includes(i[1].name)) {
            guild.commands.permissions.set({
                command: i[1].permissions.commandId, permissions: fullPerms
            })
        } else if(!i[1].defaultPermission) {
            guild.commands.permissions.set({
                command: i[1].permissions.commandId, permissions: [{id: guild.roles.everyone.id, type: 'ROLE', permission: true}]
            })
        }  
    }
}