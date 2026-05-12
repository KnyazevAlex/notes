const Sidebar = () => (
          <aside className="flex flex-col bg-[#0F172A] w-64 border-r border-slate-700 py-8 items-center gap-10">
          <div className="text-2xl font-bold text-teal-400">Notes App</div>
          
          <div className="flex flex-col gap-4 w-full px-6 text-slate-300 text-lg">
             <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
               <span>All Notes</span>
               <span className="text-teal-400 font-mono text-sm">5</span>
             </div>
             {/* Add more sidebar items here */}
          </div>
        </aside>
)
export default Sidebar