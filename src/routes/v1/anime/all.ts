import Koa from 'koa'
import { createApp } from '../../..'
import OkamiSubsScraper from '../../../scrapers/OkamiSubs'
import onanime from '../../../scrapers/onanime'
import { AnimeRespone } from '../../../utils'

const okamisubs = new OkamiSubsScraper()

async function main(ctx: Koa.Context) {
  let res: AnimeRespone

  switch (ctx.query.provider) {
    case 'onanime':
      res = await onanime.getAnimeList()
      break
    case 'okamisubs':
      res = {
        serviceId: okamisubs.serviceId,
        lang: okamisubs.lang,
        data: await okamisubs.getAnimeList(),
      }
      break
  }

  ctx.status = 200
  ctx.body = res
}
export default createApp((app: Koa) => {
  app.use(main)
})
