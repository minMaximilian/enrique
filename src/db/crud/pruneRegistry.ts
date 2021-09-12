import sign_ups from "../../interfaces/sign_ups"
import sql from "../db"

export default async (guild_id: string, name: string) => {
    await sql`
    DELETE FROM sign_ups 
    WHERE guild_id=${guild_id} AND registry_name=${name}
    `

    return await sql<sign_ups[]>`
    SELECT sign_ups.uuid, sign_ups.role_text, register.message_id, register.channel_id
    FROM register
    FULL OUTER JOIN sign_ups ON register.guild_id=sign_ups.guild_id AND register.registry_name=sign_ups.registry_name
    WHERE register.guild_id=${guild_id} AND register.registry_name=${name}
    `
}