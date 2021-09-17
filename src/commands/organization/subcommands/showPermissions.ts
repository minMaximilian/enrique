import { CommandInteraction, MessageEmbed } from "discord.js";
import redis from "../../../db/redis";
import { choices } from "../helpers/choices";

export default async (interaction: CommandInteraction) => {
    let permissions = []
    for (let i of choices) {
        const roles = JSON.parse(await redis.get(`${interaction.guildId}_${i[0]}`))
        if (roles) {
            permissions.push({'permission': i[0], 'roles': roles.roles})
        }
    }
    let permsText = ''
    if (permissions) {
        permsText = permissions.map(i => `**Command: ${i.permission}**\nRoles:\n${i.roles.map((j: string) => `<@&${j}>`).join('\n')}`).join('\n\n')
    } else {
        permsText = 'There are no permissions set'
    }

    let embed = new MessageEmbed()
        .setTitle('Current Permissions')
        .setDescription(permsText)
        .setTimestamp()

    interaction.reply({embeds: [embed], ephemeral: true})
}