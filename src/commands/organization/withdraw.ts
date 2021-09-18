import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, TextChannel } from "discord.js";
import postgres from "postgres";
import deregister from "../../db/crud/deregister";
import sign_ups from "../../interfaces/sign_ups";
import registryEmbed from "./helpers/registryEmbed";

export default {
	data: new SlashCommandBuilder()
        .setDefaultPermission(false)
		.setName('withdraw')
		.setDescription('Withdraws a user\'s registration')
        .addStringOption(option =>
            option
                .setName('registry')
                .setDescription('Deregisters you from a specified register')),
        
	async execute(interaction: CommandInteraction) {
        let res: false | postgres.RowList<sign_ups[]> = false
        res = await deregister(interaction.guildId!, interaction.options.getString('registry')!, interaction.user.id)
        if (res) {
                const chan = await interaction.guild?.channels.fetch(res[0].channel_id).catch() as TextChannel
                const msg = await chan.messages.fetch(res[0].message_id)
                const list = res.map(x => `<@${x.uuid}>: ${x.role_text}`).join('\n')
                const embed = registryEmbed(interaction, list, msg!.embeds[0].footer)
                await msg.edit({embeds: [embed]})
        } else {
            await interaction.reply({content: `The registry board ${interaction.options.getString('registry')} doesn't exist or you weren't previously registered`, ephemeral: true})
        }
	},
};
