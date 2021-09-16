import { CommandInteraction } from "discord.js";
import redis from "../../../db/redis";

export default async (interaction: CommandInteraction) => {
    const role = interaction.options.getRole('role')?.id
    const command = interaction.options.getString('command_name')
    const reply = await redis.get(`${interaction.guildId}_${command}`)
    if (reply) {
        const commands = JSON.parse(reply)
        if (commands.roles.includes(role)) {
            commands.roles.filter((item: string | undefined) => item !== role)
        }
        const comstr = JSON.stringify(commands)
        redis.set(`${interaction.guildId}_${command}`, comstr)
        interaction.reply('Succesfully set the role')
    }
}