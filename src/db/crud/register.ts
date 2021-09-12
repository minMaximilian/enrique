import { ContextMenuInteraction } from "discord.js"
import register from "../../commands/organization/register"
import sql from "../db"

interface sign_ups {
    uuid: string,
    role_text: string,
    message_id: string,
    channel_id: string,
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
        SELECT sign_ups.uuid, sign_ups.role_text, register.message_id, register.channel_id
        FROM sign_ups
        INNER JOIN register ON register.guild_id=sign_ups.guild_id AND register.registry_name=sign_ups.registry_name
        WHERE sign_ups.guild_id=${guild_id} AND sign_ups.registry_name=${name}
        `
    } else {
        return false
    }
}