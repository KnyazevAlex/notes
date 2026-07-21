'use server'

import zodSignUpSchema, {FormState} from "./zodSignUpSchema"
import connectToMongo from "./mongoConnect"
import getAuthModel from "@/(server-components)/models/UserAuthModel"
import bcrypt from "bcrypt"
import * as z from 'zod'
import createSession from "./sessions/createSession"
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


const signUp = async(state: FormState, FormData: FormData) => {

const rawCredentials = {name: FormData.get('name'), email: FormData.get('email'), password: FormData.get('password')}


const validatedProps = zodSignUpSchema.safeParse(rawCredentials)

if(!validatedProps.success){
    

    return {
        errors: z.flattenError(validatedProps.error),
        message:'Validating props failed!'
       
    }
}

const {name, email, password} = validatedProps.data


const userConn = await connectToMongo('auth')

const hashedPassword = await bcrypt.hash(password, 10)



const authModel = getAuthModel(userConn)

const user = new authModel({
    name,
    email,
    password: hashedPassword
})


const userExists = await authModel.findOne({email})

if(userExists) {

return{
  errors: {
    fieldErrors: {
      name: [],
      email: [],
      password: [] 
    },
    formErrors: ['This email is already taken!'] 
  },
  message: 'User already exists!'

}

}
   

try{

await user.save()
await createSession(user._id)

}


catch(err){
    throw new Error(`Error signing up!${err}`)
    
}



revalidatePath('/home')
redirect('/home')


}

export default signUp
