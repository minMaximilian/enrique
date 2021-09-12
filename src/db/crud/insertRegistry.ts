import sql from "../db";

export default async (guild_id: string, message_id: string, name: string) => {
    return await sql`
    INSERT INTO register
    VALUES (${guild_id}, ${message_id}, ${name}, NULL)
    `
}