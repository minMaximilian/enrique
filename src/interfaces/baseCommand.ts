import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default interface BaseCommand {
    data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup' | 'SlashCommandSubcommandsOnlyBuilder'> |  SlashCommandSubcommandsOnlyBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}