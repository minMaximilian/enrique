import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import ifRegistry from "../../../db/crud/ifRegistry"
import insertRegistry from "../../../db/crud/insertRegistry"
import hasPermission from "../helpers/hasPermission"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    if (interaction.channel?.type !== 'DM') {
        const embed = new MessageEmbed()
            .setColor('AQUA')
            .setTitle(`People currently registered for ${r_name}`)
            .setDescription('This is a registry board, you can use /register to show up here')
            .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())
    
        let channel = interaction.options!.getChannel('channel', false)! as TextChannel
        const c = await ifRegistry(interaction.guildId!, r_name)
    
        if (channel && channel.type === 'GUILD_TEXT') {
            if (!c.count) {
                let msg = await channel.send({embeds: [embed]})
                await insertRegistry(interaction.guildId!, interaction.channelId, msg.id, r_name)
        
                await interaction.reply({content: `Created a registry in the channel: ${channel.name}`, ephemeral: true})
            } else {
                await interaction.reply({content: `The registry ${r_name} already exists`, ephemeral: true})
            }
            
        } else {
            channel = interaction.channel as TextChannel
            let msg = await channel.send({embeds: [embed]})
            if (!c.count) {
                await insertRegistry(interaction.guildId!, interaction.channelId, msg.id, r_name)
    
                await interaction.reply({content: `Created a registry in concurrent channel, channel selected wasn't a text channel`, ephemeral: true})
            } else {
                await interaction.reply({content: `The registry ${r_name} already exists`, ephemeral: true})
            } 
        }
    } else if (hasPermission(interaction.member!.permissions, Permissions.FLAGS.ADMINISTRATOR)) {
        await interaction.reply({content: 'Insufficient permissions', ephemeral: true})
    } else {
        await interaction.reply({content: 'This command isn\'t functional in dms', ephemeral: true})
    }
}
