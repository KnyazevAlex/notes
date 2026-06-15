import Card from "@/(components)/Card"
import loadNotes from "@/(server-components)/loadNotes"
import { revalidatePath } from 'next/cache'



const Createnotes = async() => {
    


const notes = await loadNotes()

return(
        <aside className="flex flex-col w-96 text-center gap-10 py-8 bg-[#334155] max-lg:hidden">
            <div className="flex justify-center">
            <form action="">
            <a
             className="bg-[#4bb46e] w-70 h-15 p-4 rounded-lg text-xl cursor-pointer hover:animate-pulse"
             href="/home/createNote"
             >Create a new note</a>
            </form>
           </div>
             {
                notes.length === 0 
                ?
                 <div>
                    <p>No notes to display!</p>
                 </div>
                 :
                notes.map((note : any) => (
                    <Card
                    title={note.title.length > 25 ? `${(note.title).slice(0,25)}.....` : note.title}
                    subtitle={note.subtitle.length > 25 ? `${(note.subtitle).slice(0,25)}.....` : note.subtitle}
                    content={note.body}
                    key={note.id}
                    id={note.id}
                 
                    />
                ))
            }  
           
        </aside>
    )
}
export default Createnotes