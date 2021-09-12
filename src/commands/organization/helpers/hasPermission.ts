import { Permissions } from "discord.js"

export default (permissions: string | Readonly<Permissions>, flag: bigint): boolean => {
    if (typeof permissions === 'string') {
        return false
    } else {
        return permissions.has(flag)
    }
}