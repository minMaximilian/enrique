import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import registry from './organization/registry';
import permissions from './organization/permissions';
import ping from './info/ping';
import website from './info/website';
import signup from './organization/signup';
import skanderbeg from './skanderbeg/skanderbeg';
import disqualify from './organization/disqualify';
import withdraw from './organization/withdraw';

const commandList: BaseCommand[] = [
    registry, 
    permissions,
    ping, 
    signup, 
    skanderbeg,
    website,
    disqualify,
    withdraw
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)