export const paths = {
  home: (): string => '/',
  login: (): string => '/login',
  signup: (): string => '/signup',
  add: (): string => '/add',
  details: (slug: string): string => `/details/${slug}`,
}
