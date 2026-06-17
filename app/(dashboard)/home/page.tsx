import Link from "next/link";
import Image from "next/image";


export default function Home() {


  return (
    <div className="min-h-screen h-100vh bg-[#0F172A] text-slate-100 p-6 ">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight max-sm:text-xl">
            Welcome to Your Knowledge Base
          </h1>
          <p className="mt-2 text-base text-slate-400">
            Create, organize, and review your thoughts, blueprints, and tech stack overviews all in one secure place.
          </p>
        </header>

    
        

        {/* Two-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: How To Use (Main Content) */}
          <main className="lg:col-span-2 space-y-6 max-sm:text-xs ">
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                🚀 Getting Started & Usage Guide
              </h2>
              
              <div className="space-y-4 text-slate-300">
                <div className="flex gap-4">
                  <div className="max-sm:hidden shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Draft Your Ideas</h3>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Navigate to the creation form. Enter a high-level title, a descriptive subtitle, and use the expansive body zone to spill out your thoughts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="max-sm:hidden shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Server-Side Guardrails</h3>
                    <p className="text-sm text-slate-400 mt-0.5">
                      When you click "Create Note!", our server intercepts the data instantly. It checks every field against strict character formatting rules to keep your workspace pristine.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="max-sm:hidden shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Instant Database Sync</h3>
                    <p className="text-sm text-slate-400 mt-0.5">
                      Once verified, the document safely bypasses injection risks and locks directly into MongoDB. The pipeline then flushes Next.js route caches automatically so your feed updates on the spot.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formatting Tips / Shortcuts Card */}
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-slate-100 mb-3">
                💡 Document Writing Rules
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                To guarantee clean indexing and prevent accidental database bloat, the built-in validators enforce the following limits:
              </p>
              <ul className="space-y-2.5 text-sm text-slate-300 list-disc list-inside">
                <li><strong className="text-indigo-400">Title Field:</strong> Must be between 3 and 50 characters. Empty spaces alone are automatically rejected.</li>
                <li><strong className="text-indigo-400">Subtitle Field:</strong> Requires 3-50 characters. Best used to sum up context or technologies used.</li>
                <li><strong className="text-indigo-400">Body Field:</strong> Designed for details. Currently restricted to 50 characters max for quick logging (expandable via server schema).</li>
              </ul>
            </div>
          </main>

          {/* Right Column: Sidebar / System Logs */}
          <aside className="space-y-6">
            <div className="bg-[#1E293B] border border-slate-700/50 rounded-xl p-6 shadow-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                System Capabilities
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 block mb-0.5">NEXT.js SERVER ACTIONS</span>
                  <p className="text-xs text-slate-400">No traditional internal API routes or heavy HTTP boilerplate. Native RPC handlers directly run server tasks.</p>
                </div>
                
                <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block mb-0.5">OPTIMISTIC RENDERING</span>
                  <p className="text-xs text-slate-400">Uses fine-tuned cache revalidation mechanics, resetting target client UI components effortlessly on return success triggers.</p>
                </div>

                <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-0.5">MONGOOSE SCHEMAS</span>
                  <p className="text-xs text-slate-400">Strict ODM casting mapped underneath ensuring structural data integrity directly in production clouds.</p>
                </div>
              </div>
            </div>

            {/* Quick Actions for small screens (create & view notes) */}
            <div className="lg:hidden bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 shadow-md text-white">
              <h3 className="text-lg font-bold">Ready to create?</h3>
              <p className="text-xs text-indigo-100 mt-1 mb-4">
               Create your note by clicking the button below
              </p>
              <Link 
              className="w-full text-center py-2 px-4 bg-white/10 hover:bg-white/20 transition rounded-lg text-sm font-medium border border-white/10 cursor-pointer"
              href={'/home/createNote'}
              >
                Create
              </Link>
              
            </div>

            <div className="lg:hidden bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 shadow-md text-white ">
              <h3 className="text-lg font-bold">Want to checkout all notes you created?</h3>
              <p className="text-xs text-indigo-100 mt-1 mb-4">
                Click the button below to view the notes you created!
              </p>
              <div className="w-full text-center py-2 px-4 bg-white/10 hover:bg-white/20 transition rounded-lg text-sm font-medium border border-white/10 cursor-pointer">
                View my notes
              </div>
              
            </div>

          </aside>
      
          
        </div>

      </div>
      <footer className="mt-60 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p>© {new Date().getFullYear()} NoteVault Inc. Built with Next.js Server Actions & MongoDB.</p>
          </div>
          <div className="flex gap-4 max-sm:text-xs">
            <a href="#" className="hover:text-indigo-400 transition">System Status</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-indigo-400 transition">Security Protocol</a>
            <span className="text-slate-700">•</span>
            <a href="#" className="hover:text-indigo-400 transition">API Reference</a>
          </div>
        </footer>
    </div>
  );
}

