import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import createRegistry from './organization/createRegistry';
import register from './organization/register';
import deregister from './organization/deregister';

const commandList: BaseCommand[] = [
    ping, 
    createRegistry, 
    register, 
    deregister
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)