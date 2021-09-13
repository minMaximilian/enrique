import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import pruneRegistry from "../../../db/crud/pruneRegistry"
import hasPermission from "../helpers/hasPermission"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {    
        const res = await pruneRegistry(interaction.guildId!, r_name)
        if (res) {
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            const msg = await chan.messages.fetch(res[0].message_id)
            const list = ''
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
                .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
                .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())

            msg.edit({embeds: [embed]})     

            await interaction.reply({content: 'Succesfully deregistered everyone', ephemeral: true})
        } else {
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply({content: 'Insufficient permissions', ephemeral: true})
    } else {
        await interaction.reply({content: 'This command isn\'t functional in dms', ephemeral: true})
    }
}
