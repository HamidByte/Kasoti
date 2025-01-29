import allCelebrities from '@/data/celebrities'
import unitedStates from '@/data/celebrities/unitedStates.js'
import northAmerica from '@/data/celebrities/northAmerica.js'
import southAmerica from '@/data/celebrities/southAmerica.js'
import europe from '@/data/celebrities/europe.js'
import asia from '@/data/celebrities/asia.js'
import middleEast from '@/data/celebrities/middleEast.js'
import subcontinent from '@/data/celebrities/subcontinent.js'
import africa from '@/data/celebrities/africa.js'
import { REGIONS } from '@/utils/constants'

export function getRandomCelebrityByRegion(region) {
  let celebrities

  switch (region) {
    case REGIONS[0].value:
      celebrities = allCelebrities
      break
    case REGIONS[1].value:
      celebrities = unitedStates
      break
    case REGIONS[2].value:
      celebrities = northAmerica
      break
    case REGIONS[3].value:
      celebrities = southAmerica
      break
    case REGIONS[4].value:
      celebrities = europe
      break
    case REGIONS[5].value:
      celebrities = asia
      break
    case REGIONS[6].value:
      celebrities = middleEast
      break
    case REGIONS[7].value:
      celebrities = subcontinent
      break
    case REGIONS[8].value:
      celebrities = africa
      break
    default:
      celebrities = allCelebrities
  }

  return celebrities[Math.floor(Math.random() * celebrities.length)].name
}
