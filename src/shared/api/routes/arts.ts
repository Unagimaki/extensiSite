import { api } from '..'
import { endpoints } from '../endpoints'

export const getArts = () => {
  return api.get(endpoints.arts.list)
}

export const getArtById = (id: number) => {
  return api.get(endpoints.arts.artById(id))
}
