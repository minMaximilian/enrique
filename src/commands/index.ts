import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import registry from './organization/registry';
import deregister from './organization/deregister';
import skanderbeg from './skanderbeg/skanderbeg';
import signup from './organization/signup';

const commandList: BaseCommand[] = [
    ping, 
    registry, 
    signup, 
    deregister,
    skanderbeg
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)