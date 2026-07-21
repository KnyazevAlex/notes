'use server'

import getNotesModel from "@/(server-components)/models/NotesModel"
import verifySession from "./sessions/verifySession"
import connectToMongo from './mongoConnect'
import { revalidatePath } from 'next/cache'

const findAndDeleteNote = async(id : any) => {

try{



const sessionID = await verifySession()    
const conn = await connectToMongo('notes')

const notesModel = getNotesModel(conn)


const noteToDelete = await notesModel.findOneAndDelete({
    _id: id,
    userId: sessionID

})

revalidatePath('/home')


}
catch(err){
    console.log(err)
}

}
export default findAndDeleteNote