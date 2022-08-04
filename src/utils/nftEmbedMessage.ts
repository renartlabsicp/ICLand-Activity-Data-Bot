import { MessageEmbed } from 'discord.js'
import { NFTStandard, marketStandard } from '.'

export const nftEmbedMessage = (
  canisterId: string,
  collectionIcon: string,
  collectionName: string,
  mintingNumber: string,
  standard: NFTStandard,
  price: string,
  tokenId: string
) => new MessageEmbed()
  .setColor('#E82278')
  .setTitle(`${collectionName}#${mintingNumber}`)
  .setThumbnail(collectionIcon)
  .addFields(
    { name: 'Price', value: price }
  )
  .setImage(`https://${canisterId}.raw.ic0.app/?type=thumbnail&tokenid=${tokenId}`)
  .setTimestamp()
  .setFooter({
    text: `Sold on ${marketStandard[standard].marketplace}`,
    iconURL: marketStandard[standard].iconURL
  })
