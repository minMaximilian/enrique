import sign_ups from "../../interfaces/sign_ups"
import sql from "../db"

export default async (guild_id: string, name: string) => {
    return await sql<sign_ups[]>`
    SELECT *
    FROM register
    WHERE guild_id=${guild_id} AND registry_name=${name}
    `
}