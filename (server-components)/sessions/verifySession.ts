import 'server-only'
import { Schema } from 'mongoose'
import { cookies } from 'next/headers'
import {cache} from "react"
import connectToMongo from '../mongoConnect'
import getSessionModel from '../models/sessionModel'
import getUserModel from '../models/UserAuthModel'
import { createHash } from 'crypto'
import { redirect } from 'next/navigation'



const verifySession = cache(async() => {

    const sessionCookie = (await cookies()).get('session')?.value
    console.log(`The cookies is : ${sessionCookie}`)

    if(!sessionCookie) redirect('/login')
    
    const sessionConn = await connectToMongo('session')
    const authConn = await connectToMongo('auth')

    const sessionModel = getSessionModel(sessionConn)
    const authModel =  getUserModel(authConn)
    
    const sessionIdHash = createHash('sha256').update(sessionCookie).digest("hex")
    const sessionFound = await sessionModel.findOne({sessionIdHash}).populate({
        path:"userId",
        model: authModel
    })
    
    const now = new Date()

    if(!sessionFound){

    redirect('/login')
   
    
    } 

    if(sessionFound.expiresAt < now){
        await sessionModel.deleteOne({ _id: sessionFound._id})
        redirect('/login')
    }

    //refresh the session with a new date later
    
    return sessionFound.userId


})

export default verifySession