import worldwide from './celebrities/worldwide.js'
import unitedStates from './celebrities/unitedStates.js'
import northAmerica from './celebrities/northAmerica.js'
import southAmerica from './celebrities/southAmerica.js'
import europe from './celebrities/europe.js'
import asia from './celebrities/asia.js'
import middleEast from './celebrities/middleEast.js'
import subcontinent from './celebrities/subcontinent.js'
import africa from './celebrities/africa.js'

// Combine all the lists into one
const allCelebrities = [
  ...worldwide,
  ...unitedStates,
  ...northAmerica,
  ...southAmerica,
  ...europe,
  ...asia,
  ...middleEast,
  ...subcontinent,
  ...africa,
]

export default allCelebrities
