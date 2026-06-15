'use client'

import CreateForm from "@/(components)/noteForm"
import { useDetail } from "@/(components)/contextWrapper"
import { useEffect } from "react"

const Form = () => {

const {toggledFocus, changeToggledFocus, notes} = useDetail()


useEffect(() => {


},[])


    return( 
        <div>
         <CreateForm>
            
         </CreateForm>
        </div>
    )
}
export default Form