// TODO: Role base permissions and Redis
import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import permissionWrapper from "../helpers/permissionWrapper";
import addPermissions from "./subcommands/addPermissions";
import clearPermissions from "./subcommands/clearPermissions";
import removePermissions from "./subcommands/removePermissions";
import showPermissions from "./subcommands/showPermissions";
import { choices } from "./helpers/choices";

export default {
	data: new SlashCommandBuilder()
		.setName('permissions')
		.setDescription('Grants a role a permission to use a command')
        .addSubcommand(subcommand => 
            subcommand
            .setName('add')
            .setDescription('Adds this role to the follow commands, you can put command names seperated as a list')
            .addRoleOption(option => 
                option.setName('role')
                .setDescription('The selected role that has permission to use the commands listed')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('command_name')
                .setDescription('Name of the command')
                .setRequired(true)
                .addChoices(choices))
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('clear')
            .setDescription('Clears all roles permissions to use a command')
            .addRoleOption(option => 
                option.setName('role')
                .setDescription('The selected role that has permission to use the commands listed')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('command_name')
                .setDescription('Name of the command')
                .setRequired(true)
                .addChoices(choices))
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('remove')
            .setDescription('Removes a role from using certain commands')
            .addRoleOption(option => 
                option.setName('role')
                .setDescription('The selected role that has permission to use the commands listed')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('command_name')
                .setDescription('Name of the command')
                .setRequired(true)
                .addChoices(choices))
            
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('show')
            .setDescription('Shows all of the roles under each registered command')
        ),
	async execute(interaction: CommandInteraction) {
        permissionWrapper(interaction, () => {
            switch (interaction.options.getSubcommand()) {
                case 'add':
                    addPermissions(interaction)
                    break;

                case 'clear':
                    clearPermissions(interaction)
                    break;

                case 'remove':
                    removePermissions(interaction)
                    break;

                case 'show':
                    showPermissions(interaction)
                    break;
            }
        })
	},
};
