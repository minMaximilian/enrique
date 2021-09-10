import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import createRegistry from './organization/createRegistry';

const commandList: BaseCommand[] = [ping, createRegistry]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)