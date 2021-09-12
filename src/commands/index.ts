import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import registry from './organization/registry';
import register from './organization/register';
import deregister from './organization/deregister';

const commandList: BaseCommand[] = [
    ping, 
    registry, 
    register, 
    deregister
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)