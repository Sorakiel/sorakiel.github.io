// Скриншоты проектов. Ключ = имя файла в assets/shots, он же ключ в projects.ts.
// ratio = ширина / высота. width и height - натуральные размеры для атрибутов <img>.
import alModules from '../assets/shots/al-modules.webp'
import alPhone from '../assets/shots/al-phone.webp'
import alProgress from '../assets/shots/al-progress.webp'
import alToday from '../assets/shots/al-today.webp'
import gp from '../assets/shots/gp.webp'
import gpM from '../assets/shots/gp-m.webp'
import gpSkills from '../assets/shots/gp-skills.webp'
import itc from '../assets/shots/itc.webp'
import pkPhone from '../assets/shots/pk-phone.webp'
import pkSite from '../assets/shots/pk-site.webp'
import pkSiteM from '../assets/shots/pk-site-m.webp'
import pz from '../assets/shots/pz.webp'
import pzGame from '../assets/shots/pz-game.webp'
import pzLb from '../assets/shots/pz-lb.webp'
import pzList from '../assets/shots/pz-list.webp'

export type Shot = {
  src: string
  width: number
  height: number
  /** ширина / высота; меньше 1 - телефонный скриншот */
  ratio: number
}

function shot(src: string, width: number, height: number): Shot {
  return { src, width, height, ratio: Number((width / height).toFixed(3)) }
}

export const shots = {
  'al-modules': shot(alModules, 1600, 1000),
  'al-phone': shot(alPhone, 600, 1298),
  'al-progress': shot(alProgress, 1600, 1000),
  'al-today': shot(alToday, 1600, 1000),
  gp: shot(gp, 1600, 1000),
  'gp-m': shot(gpM, 600, 1298),
  'gp-skills': shot(gpSkills, 1600, 1000),
  itc: shot(itc, 1280, 647),
  'pk-phone': shot(pkPhone, 560, 1100),
  'pk-site': shot(pkSite, 1600, 1000),
  'pk-site-m': shot(pkSiteM, 600, 1298),
  pz: shot(pz, 1600, 1000),
  'pz-game': shot(pzGame, 600, 1298),
  'pz-lb': shot(pzLb, 600, 1298),
  'pz-list': shot(pzList, 600, 1298),
} as const satisfies Record<string, Shot>

export type ShotKey = keyof typeof shots
