import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import insertRegistry from "../../../db/crud/insertRegistry"

export default async (interaction: CommandInteraction) => {
    const hasPermission = (permissions: string | Readonly<Permissions>, flag: bigint): boolean => {
        if (typeof permissions === 'string') {
            return false
        } else {
            return permissions.has(flag)
        }
    }
    
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {
        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle(`People currently registered for ${r_name}`)
            .setDescription('This is a registry board, you can use /register to show up here')
            .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())
    
        let channel = interaction.options!.getChannel('channel', false)! as TextChannel
    
        if (channel && channel.type === 'GUILD_TEXT') {
            let msg = await channel.send({embeds: [embed]})
            await insertRegistry(interaction.guildId!, interaction.channelId, msg.id, r_name)
    
            await interaction.reply(`Created a registry in the channel: ${channel.name}`)
        } else {
            channel = interaction.channel as TextChannel
            let msg = await channel.send({embeds: [embed]})
            await insertRegistry(interaction.guildId!, interaction.channelId, msg.id, r_name)
    
            await interaction.reply(`Created a registry in concurrent channel, channel selected wasn't a text channel`)
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply('Insufficient permissions')
    } else {
        await interaction.reply('This command isn\'t functional in dms')
    }
}
