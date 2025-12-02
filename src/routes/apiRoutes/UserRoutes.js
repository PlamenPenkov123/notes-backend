import express from 'express';
import auth from '../../middleware/auth.js';
import { getUser } from '../../controllers/UserController.js';

const router = express.Router();

router.get('/me', auth, getUser);

export default router;