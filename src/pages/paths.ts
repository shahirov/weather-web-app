export const path = {
  home: () => '/',
  login: () => '/login',
  register: () => '/signup',
  add: () => '/add',
  details: (slug: string) => `/details/${slug}`,
}
