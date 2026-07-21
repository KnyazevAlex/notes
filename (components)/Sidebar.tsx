import Link from "next/link"
import loadNotes from "@/(server-components)/loadNotes"
import SideBarTsx from "./SideBarJsx"


const Sidebar = async() => {

const loadedNotes = await loadNotes()


return(
  <SideBarTsx
  loadedNotes={loadedNotes}
  ></SideBarTsx>
)
}

        
export default Sidebar