import { CommandInteraction, TextChannel } from "discord.js"
import pruneRegistry from "../../../../db/crud/pruneRegistry"
import removeRegistry from "../../../../db/crud/removeRegistry"
import registryEmbed from "../../helpers/registryEmbed"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
    const res = await pruneRegistry(interaction.guildId!, r_name)
    if (res) {
        const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
        const msg = await chan.messages.fetch(res[0].message_id)
        const embed = registryEmbed(interaction, '', false)
            
        await interaction.reply({content: 'Succesfully deregistered everyone', ephemeral: true})
    } else {
        await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
    }
}
