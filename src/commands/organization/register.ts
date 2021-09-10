import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName('create_registry')
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
            await interaction.reply('Succesfully registered')
        } else {
            await interaction.reply('This command isn\'t functional in dms')
        }
	},
};
