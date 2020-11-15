import { getCitiesFx } from '~/api/cities'

import { $cities } from './model'

$cities.on(getCitiesFx.doneData, (_, cities) => Object.values(cities))
