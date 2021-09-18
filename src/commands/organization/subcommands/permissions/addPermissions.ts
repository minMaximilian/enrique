import { CommandInteraction } from "discord.js";
import { commands } from "../../../../events/ready";

export default async (interaction: CommandInteraction) => {
    const allowedCommands = await interaction.client!.application?.commands.permissions.fetch({ guild: interaction.guildId! })
    const role = interaction.options.getRole('role')
    const command_name = interaction.options.getString('command_name')
    let command_id

    for (let i of commands!) {
        if (i[1].name == command_name) {
            command_id = i[1].permissions.commandId
            break
        }
    }

    if (!command_id) return await interaction.reply(`${command_name}, doesn't not exist`)

    interaction.guild?.commands.permissions.add({command: command_id, permissions: [
        {
        id: role!.id,
        type: 'ROLE',
        permission: true
        }
    ]})
    .then(() => {
        interaction.reply({content: `Added <@&${role?.id}> from ${command_name}`, ephemeral: true})
    })
    .catch(() => {
        interaction.reply({content: `Adding <@&${role?.id}> was unsuccesful, the role may not exist, or be apart of the permissions`, ephemeral: true})
    })
}