import express from "express";
import userRoutes from "./apiRoutes/UserRoutes.js";
import authRoutes from "./apiRoutes/AuthRoutes.js";
import noteRoutes from "./apiRoutes/NoteRoutes.js";

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/users', userRoutes);

router.use('/notes', noteRoutes);

export default router;

