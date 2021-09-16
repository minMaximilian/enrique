import { APIInteractionGuildMember } from "discord-api-types";
import { CommandInteraction, Guild, GuildMember, Permissions } from "discord.js";
import redis from "../../db/redis";
import guildWrapper from "./guildWrapper";
import hasPermission from "./hasPermission";

const typeGuard = (x: GuildMember | APIInteractionGuildMember): x is GuildMember => {
	return typeof x === "object";
}

const returnPermissions = async (interaction: CommandInteraction, roles: Array<string>) => {
    const data = await redis.get(`${interaction.guildId}_${interaction.commandName}`)
    if (data) {
        const j = JSON.parse(data)
        for (let i of j.roles) {
            if (roles.includes(i)) {
                return true
            }
        }
    }
    return false
}

export default async (interaction: CommandInteraction, fn: Function, ...args: any[]) => {
    guildWrapper(interaction, async (...args: any[]) => {
        let roles: Array<string> = []
        if (typeGuard(interaction.member!)) {
            roles = interaction.member.roles.cache.filter(element => element.name != '@everyone').map(x => x.id)
        }
        if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR) || returnPermissions(interaction, roles)) {
            await fn(...args)
        } else {
            interaction.reply({content: 'Insufficent permissions, ask your local administrator for appropiate roles', ephemeral: true})
        }
    }, ...args)
}