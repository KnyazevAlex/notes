import Card from "./Card"

const Createnotes = () => {
    return(
        <aside className="flex flex-col w-96 text-center gap-10 py-8 bg-[#334155]">
            <div className="flex justify-center">
            <button className="bg-[#4bb46e] w-70 h-15 rounded-xl text-xl cursor-pointer hover:animate-pulse">Create a new note</button>
           </div>
           <Card
           title="SomeImportantNote"
           subtitle="Contains useless information"
           content="I bough my quest 3s March 15th 2025"
           />
           <Card
           title="SomeImportantNote"
           subtitle="Contains useless information"
           content="I bough my quest 3s March 15th 2025"
           />
           <Card
           title="SomeImportantNote"
           subtitle="Contains useless information"
           content="I bough my quest 3s March 15th 2025"
           />
        </aside>
    )
}
export default Createnotes