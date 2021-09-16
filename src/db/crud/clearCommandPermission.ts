import sql from "../db"

export default async (guild_id: string, command_id: string) => {
    return await sql`
    DELETE FROM commands
    WHERE guild_id=${guild_id} AND command_id=${command_id}
    `
}