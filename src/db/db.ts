import { Client } from 'pg';

export default async () => {
    let database = new Client({
        user: process.env.POSTGRES_USER,
        host: 'enrique',
        database: 'enrique',
        password: process.env.POSTGRES_PASSWORD,
        port: 5432
    })

    await database.connect()

    return database
}