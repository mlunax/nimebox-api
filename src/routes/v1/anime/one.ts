import Koa from 'koa'
import { createApp } from '../../..'
import onanime from '../../../scrapers/onanime'
import AnimeZoneScraper from '../../../scrapers/Animezone'
import { AnimeRespone } from '../../../utils'

const animezone = new AnimeZoneScraper()

async function main(ctx: Koa.Context) {
  if (!ctx.query || !ctx.query.q) {
    throw new Error('Missing q param')
  } else {
    let res: AnimeRespone
    switch (ctx.query.provider) {
      case 'onanime':
        res = await onanime.getAnime(ctx.query.q)
        break
      case 'animezone':
        res = {
          serviceId: animezone.serviceId,
          data: await animezone.getAnime(ctx.query.q),
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
