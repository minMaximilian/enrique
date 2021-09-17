import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';

export default {
	data: new SlashCommandBuilder()
		.setName('website')
		.setDescription('Our current website used for our web UI'),
	async execute(interaction: CommandInteraction) {
		await interaction.reply('Our current website is WIP');
	},
};
