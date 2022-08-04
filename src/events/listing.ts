import { CategoryChannel, TextChannel } from 'discord.js'
import { DiscordClient } from '../types/discordClient'
import { Event, EventTypes } from '../types/event'
import { NFTStandard } from '../utils'
import { nftEmbedMessage } from '../utils/nftEmbedMessage'
import { nftRow } from '../utils/nftRowMessage'
import axios from 'axios'
import { makeServerActor } from '../actors/makeServerActor'
import { Guild, NFTCanister } from '../types/guild'

export const listing: Event = {
  name: 'ready',
  type: EventTypes.ONCE,
  async execute (client: DiscordClient) {
    const actor = makeServerActor()
    const list = {}
    setInterval(async () => {
      const activeGuilds = await actor.getAllGuilds(true) as Guild[]
      activeGuilds.forEach(async (g: Guild) => {
        g.collections.forEach(async (c: NFTCanister) => {
          const resp = await axios.get('https://api.nftgeek.app/api/1/collectionFeed', {
            params: {
              order: 'after',
              queryCollections: c.id,
              queryFeedTypes: 'LISTING_ADD'
            }
          })
          const { records } = resp.data.feed
          if (records.length) {
            const discordGuild = client.guilds.cache.get('981962703704834088')
            const channels = await discordGuild.channels.fetch()
            const iclandCategory = channels.find((c: CategoryChannel) => c.name.indexOf('icland') !== -1)
            const listingChannel = channels.find((c: TextChannel) => (
              c.name.indexOf('listing') !== -1 && c.parentId === iclandCategory?.id
            )) as TextChannel

            const lastRecord = records.slice(-1)[0]
            list[c.id] = {
              sequenceId: lastRecord.sequenceId,
              timeMillis: lastRecord.value.timeMillis,
              listingChannel
            }
          }
        })
      })
    }, 1000)
    setInterval(async () => {
      const activeGuilds = await actor.getAllGuilds(true) as Guild[]
      activeGuilds.forEach(async (g: Guild) => {
        g.collections.forEach(async (c: NFTCanister) => {
          if (!list[c.id]) {
            const resp = await axios.get('https://api.nftgeek.app/api/1/collectionFeed', {
              params: {
                order: 'after',
                queryCollections: c.id,
                queryFeedTypes: 'LISTING_ADD',
                sequenceId: list[c.id].sequenceId,
                timeMillis: list[c.id].timeMillis
              }
            })
            const { records } = resp.data.feed
            records.forEach(record => {
              list[c.id].listingChannel.send({
                embeds: [nftEmbedMessage(c.id, '', '', record.value.tokenId + 1, c.standard as NFTStandard, record.value.priceUsd, '')],
                components: [nftRow(c.id, '', record.value.tokenId + 1, c.standard as NFTStandard.EXT, '')]
              })
            })
          }
        })
      })
    }, 1000)
  }
}
