import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import noteRoutes from './routes/NoteRoutes.js';
import connectDB from './config/db.js';
import connectRedis from './config/redis.js';
import rateLimit from './middleware/rateLimit.js';
import auth from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

await connectDB();
await connectRedis();

app.use(morgan('dev'));
app.use(express.json());

app.use(rateLimit({ window: 60, max: 100 }));

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/notes', auth, noteRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});