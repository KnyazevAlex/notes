'use server'

import Model from '@/(server-components)/mongooseModel'
import { revalidatePath } from 'next/cache'

const findAndDeleteNote = async(id : any) => {

try{

const noteToDelete = await Model.findByIdAndDelete(id)

revalidatePath('/')


}
catch(err){
    console.log(err)
}

}
export default findAndDeleteNote