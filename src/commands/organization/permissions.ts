import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import addPermissions from "./subcommands/permissions/addPermissions";
import { choices } from "./helpers/choices";
import removePermissions from "./subcommands/permissions/removePermissions";
import showPermissions from "./subcommands/permissions/showPermissions";

export default {
	data: new SlashCommandBuilder()
        .setDefaultPermission(false)
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
        switch (interaction.options.getSubcommand()) {
            case 'add':
                addPermissions(interaction)
                break;

            case 'remove':
                removePermissions(interaction)
                break;

            case 'show':
                showPermissions(interaction)
                break;
        }
	},
};
