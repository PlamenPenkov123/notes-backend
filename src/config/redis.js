import { createClient } from 'redis';

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

const connectRedis = async () => {
    try {
        await redisClient.connect().then(() => {
            console.log('Connected to Redis');
        });
    } catch (error) {
        console.error(`Error connecting to redis: ${error}`);
        process.exit(1);
    }
};
export { redisClient };
export default connectRedis;