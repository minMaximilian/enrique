import { CommandInteraction } from "discord.js";

export default async (interaction: CommandInteraction, fn: Function, ...args: any[]) => {
    if (interaction.channel?.type === 'GUILD_TEXT') {
        await fn(interaction, ...args)
    } else {
        interaction.reply({content: 'This is a guild only command it doesn\'t work in DMs', ephemeral: true})
    }
}