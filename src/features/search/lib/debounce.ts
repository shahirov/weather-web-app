import { createEffect, createEvent, Event, forward, is, Unit } from 'effector'

export const debounce = <T>({
  source,
  timeout,
}: {
  source: Unit<T>
  timeout: number
}): Event<T> => {
  if (!is.unit(source)) throw new Error('source must be unit from effector')
  if (typeof timeout !== 'number' || timeout < 0)
    throw new Error('timeout must be positive number or zero')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rejectPromise: (reason?: any) => void
  let timeoutId: number

  const tick = createEvent<T>('debounceTimer')

  const timerFx = createEffect<unknown, T, Error>((parameter: unknown) => {
    clearTimeout(timeoutId)
    if (rejectPromise) rejectPromise()
    return new Promise((resolve, reject) => {
      rejectPromise = reject
      timeoutId = setTimeout(resolve, timeout, parameter)
    })
  })

  forward({
    from: source,
    to: timerFx,
  })

  forward({
    from: timerFx.doneData,
    to: tick,
  })

  return tick
}
