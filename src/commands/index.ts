import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/BaseCommand';
import ping from './info/ping';

const commandList: BaseCommand[] = [ping]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)