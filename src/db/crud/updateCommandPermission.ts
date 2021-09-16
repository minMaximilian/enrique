import sql from "../db";

export default async (guild_id: string, command_name: string, role_id: string) => {
    return await sql`
    UPDATE commands
    SET role_id=${role_id}
    WHERE guild_id=${guild_id} AND command_id=${command_name}
    `
}