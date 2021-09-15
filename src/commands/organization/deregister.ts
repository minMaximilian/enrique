import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction, MessageEmbed, Permissions, TextChannel } from "discord.js";
import guildWrapper from "../helpers/guildWrapper";
import permissionWrapper from "../helpers/permissionWrapper";
import deregisterSelf from "./subcommands/deregisterSelf";
import deregisterUser from "./subcommands/deregisterUser";

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
        switch (interaction.options.getSubcommand()) {
            case 'registry':
                guildWrapper(interaction, deregisterSelf)
                break;
        
            case 'user':
                await permissionWrapper(interaction, deregisterUser, interaction.options.getUser('user'))
                break;
        }
	},
};
