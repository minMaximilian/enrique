import { CommandInteraction, TextChannel } from "discord.js"
import removeRegistry from "../../../../db/crud/removeRegistry"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    const res = await removeRegistry(interaction.guildId!, r_name)
    if (res) {
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            const msg = await chan.messages.fetch(res[0].message_id)

            await msg.delete()  
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} has been destroyed`, ephemeral: true})
    } else {
        await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
    }
}
