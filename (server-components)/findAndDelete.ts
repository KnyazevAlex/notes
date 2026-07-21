'use server'

import getNotesModel from "@/(server-components)/models/NotesModel"
import verifySession from "./sessions/verifySession"
import Model from '@/(server-components)/mongooseModel'
import connectToMongo from './mongoConnect'
import { revalidatePath } from 'next/cache'

const findAndDeleteNote = async(id : any) => {

try{

await connectToMongo() 

const noteToDelete = await Model.findByIdAndDelete(id)

const conn = await connectToMongo('notes')

const notesModel = getNotesModel(conn)
const sessionID = await verifySession()

const noteToDelete = await notesModel.findOneAndDelete({
    userId: sessionID
})

revalidatePath('/home')


}
catch(err){
    console.log(err)
}

}
export default findAndDeleteNote