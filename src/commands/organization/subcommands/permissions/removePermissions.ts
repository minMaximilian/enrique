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

    interaction.guild?.commands.permissions.remove({command: command_id, roles: [role!.id]})
    .then(() => {
        interaction.reply({content: `Removed <@&${role?.id}> from ${command_name}`, ephemeral: true})
    })
    .catch(() => {
        interaction.reply({content: `Removing <@&${role?.id}> was unsuccesful, the role may not exist, or be apart of the permissions`, ephemeral: true})
    })
}