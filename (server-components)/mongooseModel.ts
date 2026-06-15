import mongoose, { Model } from "mongoose";
import NotesInterface from "@/(components)/notesInterface";


const noteSchema  = new mongoose.Schema<NotesInterface>({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    body: {type: String, required: true}
}, {timestamps: true})

const Notes =  mongoose.models.notesApp || mongoose.model('notesApp',noteSchema)

export default Notes