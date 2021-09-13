import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import register from "../../db/crud/register";

export default {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers the player to the registry')
        .addStringOption(option => 
            option.setName('registry_name')
            .setDescription('Name of the registry')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
            .setDescription('A value used to register on the board, it will be shown with your name')
            .setRequired(true)
            ),

	async execute(interaction: CommandInteraction) {
        if (interaction.channel?.type !== 'DM') {
            const res = await register(interaction.guildId!, interaction.options.getString('registry_name')!, interaction.user.id, interaction.options.getString('role')!)
            if (res) {
                const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
                const msg = await chan.messages.fetch(res[0].message_id)
                const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
                const embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
                    .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
                    .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())

                msg.edit({embeds: [embed]})     

                await interaction.reply({content: 'Succesfully registered', ephemeral: true})
            } else {
                await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
            }
        } else {
            await interaction.reply({content: 'This command isn\'t functional in dms', ephemeral: true})
        }
	},
};
