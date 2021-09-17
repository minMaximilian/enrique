import { CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import devclicks from "./subcommands/devclicks";
import area from "./subcommands/area";
import missions from "./subcommands/missions";

export default {
	data: new SlashCommandBuilder()
        .setName('skanderbeg')
        .setDescription('Skanderbeg Commands')
        .addSubcommand(subcommand => 
            subcommand
            .setName('devclicks')
            .setDescription('Gives you dev clicks of a given game')
            .addStringOption(option => 
                option.setName('game_id')
                .setDescription('ID of the game it\'s at the end of the URL')
                .setRequired(true))
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName('area')
            .setDescription('Gives you bragging rights by showing off the largest area')
            .addStringOption(option => 
                option.setName('game_id')
                .setDescription('ID of the game it\'s at the end of the URL')
                .setRequired(true))
            )
        .addSubcommand(subcommand => 
            subcommand
            .setName('missions')
            .setDescription('Gives you information about most important missions')
            .addStringOption(option => 
                option.setName('game_id')
                .setDescription('ID of the game it\'s at the end of the URL')
                .setRequired(true))
            ),
    
	async execute(interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand()) {
            case 'devclicks':
                devclicks(interaction)
                break;

            case 'area':
                area(interaction)
                break;

            case 'missions':
                missions(interaction)
                break;
        }
	},
};
