import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import registry from './organization/registry';
import deregister from './organization/disqualify';
import permissions from './organization/permissions';

const commandList: BaseCommand[] = [
    registry, 
    deregister,
    permissions,
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)