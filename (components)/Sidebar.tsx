import loadNotes from "@/(server-components)/loadNotes"
import SideBarTsx from "./SideBarTsx"


const Sidebar = async() => {

const loadedNotes = await loadNotes()


return(
  <SideBarTsx
  loadedNotes={loadedNotes}
  ></SideBarTsx>
)
}

        
export default Sidebar