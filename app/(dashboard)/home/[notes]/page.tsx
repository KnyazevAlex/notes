import NotesModel from '@/(server-components)/mongooseModel'
import { redirect } from 'next/navigation'
import UpdateNote from '@/(components)/updateNoteDebounce'
import connectToMongo from '@/(server-components)/mongoConnect'
import { Types } from 'mongoose'
import { PenIcon } from 'lucide-react'
import { notFound } from 'next/navigation'



const Note  = async ({params} : {params: Promise<{notes: string}>}) => {

await connectToMongo()



const {notes} = await params

//notes is just the id of the note//

if(!Types.ObjectId.isValid(notes)){
    notFound()
}

try{

const {title, body, subtitle, id} = await NotesModel.findById(notes)

return(
    <UpdateNote
       title={title}
       body={body}
       subtitle={subtitle}
       id={id}
    ></UpdateNote>
    
)
}
catch(err){
    redirect('/home')
}






}
export default Note