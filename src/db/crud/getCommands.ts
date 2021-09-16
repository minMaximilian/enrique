import command from "../../interfaces/command"
import sql from "../db"

export default () => {
    return sql<command[]>`
    SELECT *
    FROM commands
    `
}