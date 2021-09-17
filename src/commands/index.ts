import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import registry from './organization/registry';
import deregister from './organization/deregister';
import skanderbeg from './skanderbeg/skanderbeg';
import signup from './organization/signup';
import permissions from './organization/permissions';
import website from './info/website';

const commandList: BaseCommand[] = [
    ping, 
    registry, 
    signup, 
    deregister,
    skanderbeg,
    permissions,
    website
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)