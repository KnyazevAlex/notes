"use server"

import getNotesModel from "@/(server-components)/models/NotesModel"
import NoteModel from '@/(server-components)/mongooseModel'
import connectToMongo from './mongoConnect'
import validateField from './validator'
import verifySession from "./sessions/verifySession"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import connectToMongo from "@/(server-components)/mongoConnect";

const saveNote = async(prevState: any, formData : FormData) => {
    

const {title,subtitle,body} = Object.fromEntries(formData.entries())

const errors : {title?: string, subtitle?: string, body?: string} = {}

if (title) {
    const err = validateField(title, /^(?!\s+$).{3,50}$/, 'Title');
    if (err) errors.title = err;
}
  
if (subtitle) {
    const err = validateField(subtitle, /^(?!\s+$).{3,50}$/, 'Subtitle');
    if (err) errors.subtitle = err;
}

if (body) {
    const err = validateField(body, /^(?!\s+$).{3,50}$/s , 'Body Content');
    if (err) errors.body = err;
}

if(Object.keys(errors).length > 0){
    return {success: false, errors: errors}
}

try{

const conn = await connectToMongo('notes')
const session = await verifySession()

const notesModel = getNotesModel(conn)

const newNote = new notesModel({
await connectToMongo()

const newNote = new NoteModel({
        title: title,
        subtitle: subtitle,
        body: body,
        userId: session
})
await newNote.save()

revalidatePath('/home')



}


catch(err){
    console.log(err)
    throw new Error(`Server error: ${err}`)
}

redirect('/home')



}
export default saveNote