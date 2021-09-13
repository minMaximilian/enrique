import { CommandInteraction, MessageEmbed, Permissions, TextChannel } from "discord.js"
import pruneRegistry from "../../../db/crud/pruneRegistry"

export default async (interaction: CommandInteraction) => {
    const r_name: string = interaction.options.getString('registry_name')!
    
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
}
