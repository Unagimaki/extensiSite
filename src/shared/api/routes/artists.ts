import { api } from '..'
import { endpoints } from '../endpoints'

export const getArtists = () => {
  return api.get(endpoints.artist)
}
