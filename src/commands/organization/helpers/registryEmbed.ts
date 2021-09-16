import { CommandInteraction, MessageEmbed } from "discord.js";

export default (interaction: CommandInteraction, list: string): MessageEmbed => {
    return new MessageEmbed()
            .setColor('AQUA')
            .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
            .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
            .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())
}