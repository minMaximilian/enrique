import { RedisClientType } from "redis/dist/lib/client";
import { RedisModules } from "redis/dist/lib/commands";
import { RedisLuaScripts } from "redis/dist/lib/lua-script";
import getCommands from "./crud/getCommands";

export default async (redis: RedisClientType<RedisModules, RedisLuaScripts>) => {
    const commandPerms = await getCommands()
    for (let command of commandPerms) {
        redis.set(`${command.guild_id}_${command.command_name}`, command.role_ids)
    }
}