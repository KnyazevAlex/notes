import Link from "next/link"
import loadNotes from "@/(server-components)/loadNotes"


const Sidebar = async() => {

const loadedNotes = await loadNotes()

console.log(loadedNotes)

return(
    <aside className="flex flex-col bg-[#0F172A] w-64 border-r border-slate-700 py-8 items-center gap-10 h-screen">
          <Link
           className="text-2xl font-bold text-teal-400"
           href={'/home'}
           >Notes App</Link>
          
          <div className="flex flex-col gap-4 w-full px-6 text-slate-300 text-lg">
             <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
               <span>All Notes</span>
               <span className="text-teal-400 font-mono text-sm">{loadedNotes.length}</span>
             </div>
             {/* Add more sidebar items here */}
          </div>
        </aside>

)
}

        
export default Sidebar