import {Schema, Connection} from "mongoose";


const sessionModel = new Schema({
    sessionIdHash: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'userAuth'
    },
    expiresAt: {
        type: Date,
        required: true
    }
    
})

const getSessionModel = (conn : Connection | undefined) => {


if(!conn) throw new Error('No connection established!')

const model = conn.models.sessionModel || conn.model("sessionModel", sessionModel)

return model

}

export default getSessionModel