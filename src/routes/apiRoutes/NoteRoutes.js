import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../../controllers/NoteController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getNotes);
router.post('/', auth, createNote);
router.patch('/:id', auth, updateNote);
router.delete('/:id', auth, deleteNote);

export default router;