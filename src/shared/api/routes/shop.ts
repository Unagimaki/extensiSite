import { api } from '..'
import { endpoints } from '../endpoints'

export const getShop = () => {
  return api.get(endpoints.shop.list)
}

export const getShoptById = (id: number) => {
  return api.get(endpoints.shop.artById(id))
}
