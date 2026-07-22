import mongoose, {Connection, Model} from "mongoose";




const noteSchema  = new mongoose.Schema({
    title: {type: String, required: true},

    subtitle: {type: String, required: true},

    body: {type: String, required: true},

    userId: {

        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'userAuth',
        index: true
    }

}, {timestamps: true})


const getNotesModel = (conn: Connection | undefined) => {

if(!conn) throw Error('No connection established')    

const Notes = conn.models.notesApp || conn.model("notesApp", noteSchema) 

return Notes

}

export default getNotesModel