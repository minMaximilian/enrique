import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export default interface BaseCommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): Promise<void>;
}