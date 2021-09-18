import { CommandInteraction, MessageEmbed } from "discord.js";
import { commands } from "./../../../../events/ready";

export default async (interaction: CommandInteraction) => {
    let permsText = ''

    const allowedCommands = await interaction.client!.application?.commands.permissions.fetch({ guild: interaction.guildId! })

    if (allowedCommands) {
        for (let i of allowedCommands) {
            for (let j of commands!) {
                if (i[0] === j[1].permissions.commandId) {
                    permsText += `**Command Name: ${j[1].name}**\n${i[1].map(x => (x.type === 'ROLE') ? `Role: <@&${x.id}>` : `User: <@${x.id}>`).join('\n')}\n\n`
                    break
                }
            }
        }
    }

    let embed = new MessageEmbed()
        .setTitle('Current Permissions')
        .setDescription(permsText)
        .setTimestamp()

    interaction.reply({embeds: [embed], ephemeral: true})
}