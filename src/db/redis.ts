import { createClient } from 'redis';

const redis = createClient();

// TODO: Init for permissions

export default redis