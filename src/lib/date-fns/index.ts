type Config = {
  formatFunction?: (value: Date | number) => string
}

// eslint-disable-next-line @typescript-eslint/unbound-method
const formatDefault = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}).format

export const formatDate = (
  value: Date,
  { formatFunction = formatDefault }: Config = {},
): string => formatFunction(value)

export const getTodaysDate = (): string => {
  const date = new Date()
  return formatDate(date)
}
