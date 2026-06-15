import Sidebar from "@/(components)/Sidebar"
export default function CreateNoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="create-note-container flex h-screen w-screen overflow-hidden">
      {/* Add layout elements specific ONLY to creating a note */}
        
      <main className="flex w-screen h-screen justify-center items-center">

        {children}

      </main>
    </div>
  )
}