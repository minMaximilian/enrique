import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import registry from './organization/registry';
import deregister from './organization/deregister';
import permissions from './organization/permissions';
import ping from './info/ping';
import website from './info/website';
import signup from './organization/signup';
import skanderbeg from './skanderbeg/skanderbeg';

const commandList: BaseCommand[] = [
    registry, 
    deregister,
    permissions,
    ping, 
    signup, 
    skanderbeg,
    website
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)