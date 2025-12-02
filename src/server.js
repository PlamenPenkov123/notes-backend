import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import connectRedis from './config/redis.js';
import rateLimit from './middleware/rateLimit.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

await connectDB();
await connectRedis();

app.use(morgan('dev'));
app.use(express.json());

app.use(rateLimit({ window: 60, max: 100 }));

app.use('/api', apiRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});