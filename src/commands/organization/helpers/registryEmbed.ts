import { CommandInteraction, MessageEmbed } from "discord.js";

export default (interaction: CommandInteraction, list: string, footer: any): MessageEmbed => {
    if (footer) {
        return new MessageEmbed()
        .setColor('AQUA')
        .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
        .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
        .setFooter(footer.text, footer.iconURL)
    } else {
        return new MessageEmbed()
        .setColor('AQUA')
        .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
        .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
        .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())
    }
}