import CardType from "@/app/types/Cardtype"

const Card = ({title, subtitle, content} : CardType) => {
    return(
        <div className="cardContainer flex justify-center h-60 cursor-pointer hover:animate-bounce"> 
            <div className="card bg-[#16274b] w-75 flex flex-col wrapper justify-center rounded-xl shadow-md shadow-white" >
                <div className="">
                <h2>{title}</h2>
                <h5>{subtitle}</h5>
                <h1>{content}</h1>
                </div>
            </div>
        </div>
    )
}
export default Card