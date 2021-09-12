import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import postgres from "postgres";
import deregister from "../../db/crud/deregister";
import sign_ups from "../../interfaces/sign_ups";

// TODO: CLEANUP FOR SUBCOMMANDS, split them into diff functions
export default {
	data: new SlashCommandBuilder()
		.setName('deregister')
		.setDescription('Deregisters the player to the registry')
        .addSubcommand(subcommand =>
            subcommand
                .setName('registry')
                .setDescription('Deregisters you from a specified register')
                .addStringOption(option => option.setName('registry').setDescription('The name of the registry').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Unregisters a user from a registry, a moderator command')
                .addUserOption(option => option.setName('user').setDescription('The user you want to deregister').setRequired(true))
                .addStringOption(option => option.setName('registry').setDescription('The name of the registry').setRequired(true))),

	async execute(interaction: CommandInteraction) {
        if (interaction.channel?.type !== 'DM') {
            let res: false | postgres.RowList<sign_ups[]>
            if (interaction.options.getSubcommand() == 'registry') {
                res = await deregister(interaction.guildId!, interaction.options.getString('registry')!, interaction.user.id)
            } else {
                res = await deregister(interaction.guildId!, interaction.options.getString('registry')!, interaction.options.getUser('user')?.id!)
            }
            if (res) {
                console.log(res)
                const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
                const msg = await chan.messages.fetch(res[0].message_id)
                const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
                const embed = new MessageEmbed()
                    .setColor('AQUA')
                    .setTitle(`People currently registered for ${interaction.options.getString('registry_name')}`)
                    .setDescription(`${list}\nThis is a registry board, you can use /register to show up here`)
                    .setFooter(`This registry was made by ${interaction.user.username}`, interaction.user.displayAvatarURL())

                msg.edit({embeds: [embed]})     

                await interaction.reply('Succesfully deregistered')
            } else {
                await interaction.reply(`The registry board ${interaction.options.getString('registry_name')} doesn't exist or you weren't previously registered`)
            }
        } else {
            await interaction.reply('This command isn\'t functional in dms')
        }
	},
};
