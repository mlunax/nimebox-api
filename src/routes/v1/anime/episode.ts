import Koa from 'koa'
import { createApp } from '../../..'
import onanime from '../../../scrapers/onanime'
import AnimeZoneScraper from '../../../scrapers/Animezone'
import { AnimeRespone } from '../../../utils'

const animezone = new AnimeZoneScraper()

async function main(ctx: Koa.Context) {
  if (!ctx.query || !ctx.query.q || !ctx.query.n) {
    throw new Error('Missing q and n query')
  } else {
    let res: AnimeRespone
    switch (ctx.query.provider) {
      case 'onanime':
        res = await onanime.getPlayers(ctx.query.q, ctx.query.n)
        break
      case 'animezone':
        res = {
          serviceId: animezone.serviceId,
          lang: animezone.lang,
          data: await animezone.getPlayers(ctx.query.q, ctx.query.n),
        }
        break
    }
    ctx.status = 200
    ctx.body = res
  }
}

export default createApp((app: Koa) => {
  app.use(main)
})
