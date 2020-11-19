import { createEvent, restore } from 'effector'
import { createBrowserHistory, Location } from 'history'

export const history = createBrowserHistory()

export const locationUpdated = createEvent<Location>()
export const $location = restore(locationUpdated, history.location)
export const $pathname = $location.map((location) => location.pathname)
export const $search = $location.map((location) => location.search)

history.listen((location) => {
  locationUpdated(location)
})
