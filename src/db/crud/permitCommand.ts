import sql from "../db";

export default async (guild_id: string, command_name: string, role_id: string) => {
    return await sql`
    INSERT INTO commands
    VALUES (${guild_id}, ${command_name}, ${role_id})
    `
}