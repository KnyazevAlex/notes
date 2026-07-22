"use server"

import getNotesModel from "@/(server-components)/models/NotesModel"
import verifySession from "./sessions/verifySession"
import connectToMongo from "./mongoConnect"
import { revalidatePath } from 'next/cache'



const updateNote = async(id: string, fieldName: string, value: string | undefined ) => {



if(fieldName !== 'body' && value && value.length > 50)  return { error: 'Character limit for title & subtitle is 50!' }

const allowedFields = ['title', 'subtitle', 'body'] 

if (!allowedFields.includes(fieldName)) {
  return { error: 'Illegal action!' }
}

//if body is empty return error body has to 3 chars long at least
if(value !== undefined && value.trim().length < 3) return {error: 'fields have to be at least 3 characters long!'}

const userId = await verifySession()
const conn = await connectToMongo('notes')
const notesModel = getNotesModel(conn)


const updatedField = await notesModel.findOneAndUpdate(
 {_id: id, userId},
 {$set: {[fieldName]: value ?? '...'}},
 {new: true}
)
if (!updatedField) {
    return {
        success: false,
        error: "Note not found or access denied."
    };
}

revalidatePath('/home')

return {success: true}


}

export default updateNote