import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/BaseCommand';
import ping from './info/ping';

export const commands: Collection<string, BaseCommand> =  new Collection(
    [[ping.data.name, ping]]
)