import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import createRegistry from "./subcommands/createRegistry";
import clearRegistry from "./subcommands/clearRegistry";
import destroyRegistry from "./subcommands/destroyRegistry";

export default {
	data: new SlashCommandBuilder()
        .setName('registry')
        .setDescription('Commands for creating, clearing and destroying registries')
        .addSubcommand(subcommand => 
            subcommand
            .setName('create')
            .setDescription('Creates a registry to allow players to register for an upcoming event')
            .addStringOption(option => 
                option.setName('registry_name')
                .setDescription('Name of the registry')
                .setRequired(true))
            .addChannelOption(option =>
                option.setName('channel')
                .setDescription('A channel to put the registry in, this is where announcements will be made also')
                .setRequired(false)
                )
            .addStringOption(option =>
                option.setName('supported_game')
                .setDescription('This will create a registry for your game with one of our integrated games in the system')
                .addChoices([
                    ['Europa Universalis IV','eu4'],
                    ['Hearts of Iron IV', 'hoi4'],
                    ['Stellaris', 'stellaris'],
                    ['Civilization 5', 'civ5'],
                    ['Civilization 6', 'civ6']
                ])
            .setRequired(false))
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName('clear')
            .setDescription('Clears all records from a registry')
            .addStringOption(option => 
                option.setName('registry_name')
                .setDescription('Name of the registry')
                .setRequired(true))
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName('destroy')
            .setDescription('Destroys the registry preventing it from being used and accessed')
            .addStringOption(option => 
                option.setName('registry_name')
                .setDescription('Name of the registry')
                .setRequired(true))
            ),

	async execute(interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand()) {
            case 'create':
                await createRegistry(interaction)
                break;
        
            case 'clear':
                await clearRegistry(interaction)
                break;

            case 'destroy':
                await destroyRegistry(interaction)
                break;
        }
	},
};
