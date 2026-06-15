'use server'

import connectToMongo from "@/(server-components)/mongoConnect";
import Note from "@/(server-components)/mongooseModel"




const loadNotes = async() => {

await connectToMongo()

const rawNotes = await Note.find({}).lean()
 

 const cleanNotes = rawNotes.map((note: any) => (
  
  { 
    id: note._id.toString(),
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