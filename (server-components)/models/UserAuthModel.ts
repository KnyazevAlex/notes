import mongoose, {Connection} from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength:8
  },
}, {timestamps: true});


const getUserModel = (conn: Connection | undefined) => {

if(!conn) throw Error('No connection established')    

const Auth = conn.models.userAuth || conn.model("userAuth", userSchema) 

return Auth

}

export default getUserModel