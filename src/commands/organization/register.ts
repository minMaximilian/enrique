import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
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
                console.log(res)
                await interaction.reply('Succesfully registered')
            } else {
                await interaction.reply(`The registry board ${interaction.options.getString('registry_name')} doesn't exist`)
            }
        } else {
            await interaction.reply('This command isn\'t functional in dms')
        }
	},
};
