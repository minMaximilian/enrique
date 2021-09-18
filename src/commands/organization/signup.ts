import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, TextChannel } from "discord.js";
import register from "../../db/crud/register";
import removeRegistry from "../../db/crud/removeRegistry";
import registryEmbed from "./helpers/registryEmbed";

export default {
	data: new SlashCommandBuilder()
        .setDefaultPermission(false)
		.setName('signup')
		.setDescription('Registers the player to the registry')
        .addStringOption(option => 
            option.setName('registry_name')
            .setDescription('Name of the registry')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
            .setDescription('A value used to register on the board, it will be shown with your name')
            .setRequired(true)
            ),

	async execute(interaction: CommandInteraction) {
        const res = await register(interaction.guildId!, interaction.options.getString('registry_name')!, interaction.user.id, interaction.options.getString('role')!)
        if (res) {
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            await chan.messages.fetch(res[0].message_id).catch(() => {
                removeRegistry(interaction.guildId!, interaction.options.getString('registry')!)
                interaction.reply({content: 'Succesfully deregistered', ephemeral: true})
            }).then(async (msg) => {
                const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
                const embed = registryEmbed(interaction, list, msg!.embeds[0].footer)
                        
                await interaction.reply({content: 'Succesfully registered', ephemeral: true})
            })            
        } else {
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry_name')} doesn't exist`, ephemeral: true})
        }
	},
};
