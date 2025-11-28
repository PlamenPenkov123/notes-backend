import Note from "../models/Note.js";
import NoteDto from "../DTOs/NoteDto.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1});
        const noteDtos = notes.map(note => {
            return new NoteDto(note);
        });
        
        res.status(200).json(noteDtos);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title: title,
            content: content,
            user: req.user.id
        });
        
        await note.save();
        const noteDto = new NoteDto(note);

        res.status(201).json(noteDto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

export const updateNote = async (req, res) => {
    try {
        const id = req.params.id;

        const note = await Note.findById(id);
        if (!note) return res.status(404).json({message: 'Note not found'});
        
        const { title, content } = req.body;
        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();
        const noteDto = new NoteDto(note);

        res.status(200).json(noteDto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Note.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({message: 'Note not found'});

        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};