import { CommandInteraction } from "discord.js";
import permitCommand from "../../../db/crud/permitCommand";
import updateCommandPermission from "../../../db/crud/updateCommandPermission";
import redis from "../../../db/redis";

export default async (interaction: CommandInteraction) => {
    const role = interaction.options.getRole('role')?.id
    const command = interaction.options.getString('command_name')
    const reply = await redis.get(`${interaction.guildId}_${command}`)
    if (reply) {
        const commands = JSON.parse(reply)
        if (!commands.roles.includes(role)) {
            commands.roles.push(role)
        }
        const comstr = JSON.stringify(commands)
        updateCommandPermission(interaction.guildId!, interaction.commandName, comstr)
        redis.set(`${interaction.guildId}_${command}`, comstr)
        interaction.reply('Succesfully set the role')
    } else {
        const commands = JSON.stringify({
            roles: [role]
        })
        permitCommand(interaction.guildId!, interaction.commandName, commands)
        redis.set(`${interaction.guildId}_${command}`, commands)
        interaction.reply('Succesfully set the role')
    }
}