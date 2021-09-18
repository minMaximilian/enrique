import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, TextChannel } from "discord.js";
import postgres from "postgres";
import deregister from "../../db/crud/deregister";
import removeRegistry from "../../db/crud/removeRegistry";
import sign_ups from "../../interfaces/sign_ups";
import registryEmbed from "./helpers/registryEmbed";

export default {
	data: new SlashCommandBuilder()
        .setDefaultPermission(false)
		.setName('disqualify')
		.setDescription('Deregisters the player to the registry')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('The user you want to deregister')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('registry')
            .setDescription('The name of the registry')
            .setRequired(true)),

	async execute(interaction: CommandInteraction) {
        let res: false | postgres.RowList<sign_ups[]> = false
        res = await deregister(interaction.guildId!, interaction.options.getString('registry')!, interaction.options.getUser('user')!.id)
        if (res) {
            const chan = await interaction.guild?.channels.fetch(res[0].channel_id) as TextChannel
            await chan.messages.fetch(res[0].message_id).catch(() => {
                removeRegistry(interaction.guildId!, interaction.options.getString('registry')!)
                interaction.reply({content: 'Succesfully deregistered', ephemeral: true})
            }).then(async (msg) => {
                if (res) {
                    const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
                    const embed = registryEmbed(interaction, list, msg!.embeds[0].footer)
                
                    msg!.edit({embeds: [embed]})
                    await interaction.reply({content: 'Succesfully deregistered', ephemeral: true})
                }
            })  
        } else {
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry')} doesn't exist or you weren't previously registered`, ephemeral: true})
        }
	},
};
