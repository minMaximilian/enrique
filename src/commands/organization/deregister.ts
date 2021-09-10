import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

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
            await interaction.reply('Succesfully registered')
        } else {
            await interaction.reply('This command isn\'t functional in dms')
        }
	},
};
