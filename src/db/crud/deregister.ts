import sql from "../db"

export interface sign_ups {
    uuid: string,
    role_text: string,
    message_id: string,
    channel_id: string,
}

export default async (guild_id: string, name: string, uuid: string) => {
    const registry =  await sql<sign_ups[]>`
    SELECT guild_id, registry_name
    FROM sign_ups
    WHERE guild_id=${guild_id} AND registry_name=${name} AND uuid=${uuid}
    `
    if (registry.count) {
        await sql`
        DELETE FROM sign_ups 
        WHERE guild_id=${guild_id} AND registry_name=${name} AND uuid=${uuid}
        `

        return await sql<sign_ups[]>`
        SELECT sign_ups.uuid, sign_ups.role_text, register.message_id, register.channel_id
        FROM register
        FULL OUTER JOIN sign_ups ON register.guild_id=sign_ups.guild_id AND register.registry_name=sign_ups.registry_name
        WHERE register.guild_id=${guild_id} AND register.registry_name=${name}
        `
    } else {
        return false
    }
}