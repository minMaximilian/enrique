import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import pruneRegistry from "../../../db/crud/pruneRegistry"
import hasPermission from "../helpers/hasPermission"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {    
        const res = await pruneRegistry(interaction.guildId!, r_name)
        if (res) {
            console.log(res)
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            const msg = await chan.messages.fetch(res[0].message_id)
            const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
            const embed = new MessageEmbed()
                .setColor('AQUA')
                .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
                .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
                .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())

            msg.edit({embeds: [embed]})     

            await interaction.reply('Succesfully deregistered everyone')
        } else {
            await interaction.reply(`The registry board ${interaction.options.getString('registry_name')} doesn't exist`)
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply('Insufficient permissions')
    } else {
        await interaction.reply('This command isn\'t functional in dms')
    }
}
