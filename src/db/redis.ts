import { createClient } from 'redis';

const redis = createClient({host: 'enrique_redis'});

// TODO: Init for permissions

export default redis