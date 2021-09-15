import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js"
import postgres from "postgres"
import deregister from "../../../db/crud/deregister"
import sign_ups from "../../../interfaces/sign_ups"
import registryEmbed from "../helpers/registryEmbed"

export default async (interaction: CommandInteraction) => {
    let res: false | postgres.RowList<sign_ups[]> = false
    res = await deregister(interaction.guildId!, interaction.options.getString('registry')!, interaction.user.id)
    if (res) {
        const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
        const msg = await chan.messages.fetch(res[0].message_id)
        console.log(msg.toJSON())
        const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
        const embed = registryEmbed(interaction, list)
        msg.edit({embeds: [embed]})     
        await interaction.reply({content: 'Succesfully deregistered', ephemeral: true})
    } else {
        await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist or you weren't previously registered`, ephemeral: true})
    }
}