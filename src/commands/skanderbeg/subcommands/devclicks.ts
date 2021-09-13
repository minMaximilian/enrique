import axios from "axios";
import { CommandInteraction, MessageEmbed } from "discord.js";


export default async (interaction: CommandInteraction) => {
    const id = interaction.options.getString('game_id')
    const res = await axios.get(`https://skanderbeg.pm/api.php?key=${process.env.SKANDERBEG_KEY}&scope=getCountryData&save=${id}&value=dev_clicks;player;dev_avg_cost;tag&format=json&playersOnly=true`)
    let l = []
    for (let i in res.data) {
        l.push(res.data[i][0])
    }
    l.sort((a, b) => Number(b.dev_clicks) - Number(a.dev_clicks))

    const str = l.map((x, index) => `**${index + 1}: ${x.player}**\nCountry Tag: ${x.tag}\nDevelopment Clicks: ${x.dev_clicks}\nAverage Dev Cost: ${x.dev_avg_cost}`).join('\n\n')

    const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle(`Development Clicks`)
            .setDescription(str)    
            .setFooter(`Game ID: ${id}`)

    interaction.reply({embeds: [embed]})
}  