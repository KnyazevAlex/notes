'use server'

import * as z from 'zod'
import zodLoginSchema from "./zodLoginSchema"
import bcrypt from "bcrypt"
import { FormState } from "./zodSignUpSchema"
import getAuthModel from "@/(server-components)/models/UserAuthModel"
import connectToMongo from './mongoConnect'
import createSession from './sessions/createSession'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'


const loginAction = async(state: FormState, formData: FormData) => {

const rawCredentials = {email: formData.get('email'), password: formData.get('password')}

const validatedProps = zodLoginSchema.safeParse(rawCredentials)

if(!validatedProps.success) return{
    errors: z.flattenError(validatedProps.error) as FormState["errors"],
    message: 'Validating props failed!'
}

const {email, password} = validatedProps.data

const connection = await connectToMongo('auth')

const authModel = getAuthModel(connection)

const userExists = await authModel.findOne({email})

const genericError = {
    errors: {
        fieldErrors: {
        name: [],
        email: [],
        password: [] 
        },
        formErrors: ['Please enter a valid email or password'] 
    },
    message: 'Please enter a valid email or password'

}

if(userExists){

    const validPassword = await  bcrypt.compare(password, userExists.password )
    
    if(validPassword){

        await createSession(userExists._id)
        
        revalidatePath('/home')
        redirect('/home')
    
    }

    return genericError

}

const dummyHash = "$2b$10$/BhCHrcKtIaGhGTPDQ9o6.xtBKEwoFPjHZLNB3G8QpHWF54OXJsyy"
await bcrypt.compare(password, dummyHash)

return genericError



}
export default loginAction