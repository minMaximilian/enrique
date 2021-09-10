import { Client } from 'pg';

export default async () => {
    let database = new Client()
    // TODO Ciaran: Intialize tables if they do not yet exist
    await database.connect()

    // Intiate tables on startup if they do not exist,
    //                   [These two are a key]
    // Registrar: Holds, {Guild_ID, Message_ID, Registry_Name, Embed_Data[JSON], Role_ID}
    //
    // Events: Holds, {Guild_ID, Channel_ID, Time, Role_ID}
    // Implement CRUD methods in CRUD folder for register, deregister and createRegistry in organization commands
    // postgres node is a low abstraction library you will be writing queries manually

    return database
}