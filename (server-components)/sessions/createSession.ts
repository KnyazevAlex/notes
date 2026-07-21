import 'server-only'

import {Schema} from 'mongoose'
import {cookies} from 'next/headers'
import connectToMongo from '../mongoConnect'
import getSessionModel from '../models/sessionModel'
import { randomBytes, createHash} from 'crypto'

const createSession =  async(userId : Schema.Types.ObjectId ) => {

const conn =  await connectToMongo('session')
const sessionModel = getSessionModel(conn)

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
const sessionId = randomBytes(32).toString('hex')
const sessionIdHash = createHash("sha256").update(sessionId).digest('hex')

const newUserSession = new sessionModel({
    sessionIdHash,
    userId,
    expiresAt
})

try{
    await newUserSession.save()
}
catch(err){
    console.error(err)
    throw new Error(`Error saving session to db : ${err}`)
}

const cookieStore = await cookies()

cookieStore.set('session', sessionId, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
expires: expiresAt,
sameSite: 'lax',
path: '/'
})

}

export default createSession