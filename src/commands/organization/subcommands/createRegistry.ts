import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js"
import ifRegistry from "../../../db/crud/ifRegistry"
import insertRegistry from "../../../db/crud/insertRegistry"
import registryEmbed from "../helpers/registryEmbed"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    const embed = registryEmbed(interaction, '', false)

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
}
