import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import removeRegistry from "../../../db/crud/removeRegistry"
import hasPermission from "../helpers/hasPermission"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {    
        const res = await removeRegistry(interaction.guildId!, r_name)
        if (res) {
            console.log(res)
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            const msg = await chan.messages.fetch(res[0].message_id)
            const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
            msg.delete()    

            await interaction.reply('Succesfully deleted the registry')
        } else {
            await interaction.reply(`The registry board ${interaction.options.getString('registry_name')} doesn't exist`)
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply('Insufficient permissions')
    } else {
        await interaction.reply('This command isn\'t functional in dms')
    }
}
