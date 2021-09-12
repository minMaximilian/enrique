import { ContextMenuInteraction } from "discord.js"
import register from "../../commands/organization/register"
import sql from "../db"

interface sign_ups {
    uuid: string,
    role_text: string
}

export default async (guild_id: string, name: string, uuid: string, role: string) => {
    const registry =  await sql<sign_ups[]>`
    SELECT guild_id, registry_name
    FROM register
    WHERE guild_id=${guild_id} AND registry_name=${name}
    `
    if (registry.count) {
        await sql`
        INSERT INTO sign_ups 
        VALUES (${guild_id}, ${name}, ${uuid}, ${role})
        ON CONFLICT (guild_id, registry_name, uuid) DO UPDATE
            SET role_text = excluded.role_text;
        `

        return await sql<sign_ups[]>`
        SELECT uuid, role_text
        FROM sign_ups
        WHERE guild_id=${guild_id} AND registry_name=${name}
        `
    } else {
        return false
    }
}