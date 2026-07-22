import Sidebar from "@/(components)/Sidebar"
import verifySession from "@/(server-components)/sessions/verifySession"
import { verify } from "crypto"
import { use } from "react"

export default async function CreateNoteLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await verifySession()


  return (
    <div className="create-note-container flex h-screen w-screen">
      {/* Add layout elements specific ONLY to creating a note */}
        <Sidebar></Sidebar>
      <main className="flex w-screen h-screen justify-center items-center">

        {children}
        

      </main>
    </div>
  )
}