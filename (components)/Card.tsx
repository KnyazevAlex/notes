'use client'
import CardType from "@/app/types/Cardtype"
import { TrashIcon } from "lucide-react"
import Link from "next/link"
import deleteNote from "@/(server-components)/findAndDelete"



const Card = ({title, subtitle, id} : CardType) => {



    return(

      <div className="relative group"> 
  <Link  
    className="cardContainer flex justify-center h-60 cursor-pointer hover:scale-105 transition-transform duration-200"
    href={`/home/${id}`}
  > 
    <div className="card bg-[#16274b] w-75 flex flex-col wrapper justify-center rounded-xl shadow-lg shadow-black p-6">
      <div className="noteCard" id={id}>
        <h2>{title}</h2>
        <h5>{subtitle}</h5>
      </div>
    </div>
  </Link>


  <div className="absolute top-4 right-2">
    <form action={deleteNote.bind(null, id)}>
      <button
        className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
        type="submit"
      >
        <TrashIcon
          size={25} 
          className="hover:scale-110 transition-transform"
        />  
      </button>
    </form>
  </div>
</div>
    )
}
export default Card