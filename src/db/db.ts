import { Client } from 'pg';

export default async () => {
    let database = new Client()
    return await database.connect()
}