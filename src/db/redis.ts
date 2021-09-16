import { createClient } from 'redis';
import initRedis from './initRedis';

const redis = createClient({socket: {
    host: 'enrique_redis'
}})

redis.connect()

initRedis(redis)

export default redis