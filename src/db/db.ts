import postgres from "postgres";

const sql = postgres({
    host: 'enrique_db',
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'prod'
})

export default sql