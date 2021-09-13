import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import removeRegistry from "../../../db/crud/removeRegistry"
import hasPermission from "../helpers/hasPermission"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {    
        const res = await removeRegistry(interaction.guildId!, r_name)
        if (res) {
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            const msg = await chan.messages.fetch(res[0].message_id)
            const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
            msg.delete()    

            await interaction.reply({content: 'Succesfully deleted the registry', ephemeral: true})
        } else {
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply({content: 'Insufficient permissions', ephemeral: true})
    } else {
        await interaction.reply({content: 'This command isn\'t functional in dms', ephemeral: true})
    }
}
