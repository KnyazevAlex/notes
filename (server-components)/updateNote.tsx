"use server"

import getNotesModel from "@/(server-components)/models/NotesModel"
import connectToMongo from "./mongoConnect"
import { revalidatePath } from 'next/cache'



const updateNote = async(id: any , fieldName: string, value: string | undefined ) => {

try{

if(fieldName !== 'body' && value && value.length > 50)  return { error: 'Charachter limit for title & body is 50!' }

const allowedFields = ['title', 'subtitle', 'body'] 

if (!allowedFields.includes(fieldName)) {
  return { error: 'Illegal action!' }
}

//if body is empty return error body has to 3 chars long at least
if(value?.length && value.length < 3 || value!.length === 0 ) return {error: 'fields have to be at least 3 characters long!'}

const conn = await connectToMongo('notes')

const notesModel = getNotesModel(conn)

const updatedField = await notesModel.findByIdAndUpdate(
 id, 
 {$set: {[fieldName]: value ?? '...'}},
 {new: true}
)

revalidatePath('/')

return {success: true}

}
catch(err:any){

console.log(err)

return {success: false, errors: {serverSide: err.message || 'Database error!'}}

}


}

export default updateNote