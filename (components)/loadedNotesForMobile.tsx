import loadNotes from "@/(server-components)/loadNotes"
import HomePage from "./HomePage"

const NoteDisplay = async() => {

const notes = await loadNotes()

    return(
       <HomePage
       mobileNotes={notes}
       ></HomePage>
    )
}

export default NoteDisplay