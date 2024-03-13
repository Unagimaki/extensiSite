import Axios from 'axios'

export * from './endpoints'

export const URL = `https://europe-west1-eone-partner.cloudfunctions.net/extensiAPI` // TODO add api path

export const api = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
