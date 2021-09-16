import command from "../../interfaces/command"
import sql from "../db"

export default async (guild_id: string, command_name: string) => {
    return await sql<command[]>`
    SELECT *
    FROM commands
    WHERE guild_id=${guild_id} AND command_name=${command_name}
    `
}