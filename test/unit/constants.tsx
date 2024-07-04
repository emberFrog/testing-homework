import { CartApi, ExampleApi } from '../../src/client/api'
import { initStore } from '../../src/client/store'

const basename = '/hw/store'
const api = new ExampleApi(basename)
const cart = new CartApi()
export const store = initStore(api, cart)
