import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/NoteController.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.patch('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;