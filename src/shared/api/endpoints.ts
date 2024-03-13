// for several APIs, create several objects like authEndpoints, shopEndpoints, etc.

export const endpoints = {
  news: `/news`,
  article: (id: number) => `/article/${id}`,
  artist: `/artists`,
  arts: {
    list: `/art`,
    artById: (id: number) => `/art/${id}/`,
  },
  gallery: {
    list: '/gallery',
    byId: (id: number) => `/gallery/${id}`,
  },
  shop: {
    list: `/shop`,
    artById: (id: number) => `/art/${id}/`,
  },
}
