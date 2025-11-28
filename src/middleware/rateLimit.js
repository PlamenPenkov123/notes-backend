import { redisClient} from '../config/redis.js';

/**
 * options:
 *   window: seconds for rate limit window
 *   max: max requests per window
 */
const rateLimit = ( {window, max} ) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip;
            const key = `rate:${ip}`

            const current = await redisClient.incr(key);
            if (current === 1) {
                redisClient.expire(key, window);
            }

            if (current > max) {
                return res.status(429).json({message: `Too many requests - please try again later.`});
            }

            next();
        } catch (error) {
            console.error(`Rate limiting error: ${error}`);
            next();
        }
    };
}

export default rateLimit;