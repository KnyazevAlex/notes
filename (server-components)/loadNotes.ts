'use server'

import connectToMongo from "@/(server-components)/mongoConnect";
import verifySession from "./sessions/verifySession";
import getNotesModel from "@/(server-components)/models/NotesModel"
import {cache} from "react"




const loadNotes = cache(async() => {


const sessionID =  await verifySession()

const conn = await connectToMongo('notes')

const NotesModel = getNotesModel(conn)

const rawNotes = await NotesModel.find({
  userId: sessionID
}).lean()
 

 const cleanNotes = rawNotes.map((note) => (
  
  { 
    id: note._id.toString(),
    userId: note.userId.toString(),
    title: note.title,
    subtitle: note.subtitle,
    body: note.body,
    createdAt: note.createdAt?.toISOString() ?? null,
    updatedAt: note.updatedAt?.toISOString() ?? null,
  }

 
   
 ))

return cleanNotes

  
  }
)


export default loadNotes