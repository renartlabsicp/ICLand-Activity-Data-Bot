import { MessageActionRow, MessageButton } from 'discord.js'
import { NFTStandard, marketStandard } from '.'

export const nftRow = (
  canisterId: string,
  collectionName: string,
  mintingNumber: string,
  standard: NFTStandard,
  tokenId: string
) => {
  let marketplaceURL

  switch (standard) {
    case (NFTStandard.DIP721):
      marketplaceURL = ''
      break
    case (NFTStandard.EXT):
      marketplaceURL = marketStandard[standard].marketplaceURL + tokenId
      break
    case (NFTStandard.ICPunks):
      marketplaceURL = `${marketStandard[standard].marketplaceURL}${collectionName}/${mintingNumber}`
      break
    default:
      throw new Error('Update switch/case to match all possibilities.')
  }
  return new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('VIEW TRANSACTION')
        .setStyle('LINK')
        .setURL(marketplaceURL),
      new MessageButton()
        .setLabel('VIEW TOKEN')
        .setStyle('LINK')
        .setURL(`https://${canisterId}.raw.ic0.app/?tokenId${tokenId}`)
    )
}
