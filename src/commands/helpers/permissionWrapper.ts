import { APIInteractionGuildMember } from "discord-api-types";
import { CommandInteraction, Guild, GuildMember, GuildMemberManager, Permissions } from "discord.js";
import redis from "../../db/redis";
import hasPermission from "./hasPermission";

const typeGuard = (x: GuildMember | APIInteractionGuildMember): x is GuildMember => {
	return typeof x === "object";
}

const returnPermissions = (interaction: CommandInteraction, roles: Array<string>) => {
    return redis.get(`${interaction.guildId}_${interaction.commandId}`, (err, data) => {
        if (err) {
          console.error(err);
        }
        if (data) {
            const j = JSON.parse(data)
            for (let i of j.roles) {
                if (roles.includes(i)) {
                    return true
                }
            }
        }
        return false
    })
}

export default async (interaction: CommandInteraction, fn: Function) => {
    if (interaction.channel?.type === 'GUILD_TEXT') {
        let roles: Array<string> = []
        if (typeGuard(interaction.member!)) {
            roles = interaction.member.roles.cache.filter(element => element.name != '@everyone').map(x => x.id)
        }
        if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR) || returnPermissions(interaction, roles)) {
            await fn()
        } else {
            interaction.reply({content: 'Insufficent permissions, ask your local administrator for appropiate roles', ephemeral: true})
        }
    } else {
        interaction.reply({content: 'This is a guild only command it doesn\'t work in DMs', ephemeral: true})
    }
}