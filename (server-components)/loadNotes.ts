'use server'

import connectToMongo from "@/(server-components)/mongoConnect";
import verifySession from "./sessions/verifySession";
import getNotesModel from "@/(server-components)/models/NotesModel"




const loadNotes = async() => {


const sessionID =  await verifySession()

const conn = await connectToMongo('notes')

const NotesModel = getNotesModel(conn)

const rawNotes = await NotesModel.find({
  userId: sessionID
}).lean()
 

 const cleanNotes = rawNotes.map((note: any) => (
  
  { 
    id: note._id.toString(),
    userId: note.userId.toString(),
    
    title: note.title,
    subtitle: note.subtitle,
    body: note.body,
    createdAt: note.createdAt?.toString() || null,
    updatedAt: note.updatedAt?.toString() || null,
  }

 
   
 ))
 console.log(cleanNotes)

return cleanNotes

  
  }



export default loadNotes