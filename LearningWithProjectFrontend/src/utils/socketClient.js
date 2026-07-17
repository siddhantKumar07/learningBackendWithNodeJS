import io from 'socket.io-client'
import { base_url } from './constants'

export const createConnection = ()=>{
    return io(base_url)
}
