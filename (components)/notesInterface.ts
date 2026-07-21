import { Schema } from "mongoose"

interface Notes {
    title: string,
    subtitle: string,
    body: string
    userId: Schema.Types.ObjectId
}
export default Notes