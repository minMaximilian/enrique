import { Collection } from 'discord.js';
import BaseCommand from '../interfaces/baseCommand';
import ping from './info/ping';
import skanderbeg from './skanderbeg/skanderbeg';
import signup from './organization/signup';
import website from './info/website';

const commandList: BaseCommand[] = [
    ping, 
    signup, 
    skanderbeg,
    website
]

export const commands: Collection<string, BaseCommand> =  new Collection(
    commandList.map(command => [command.data.name, command])
)