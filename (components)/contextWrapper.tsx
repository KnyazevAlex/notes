'use client'

import React, { useState, useContext, createContext } from "react"

const GlobalContext = createContext<any>(null)

const ContextWrap = ({children} : {children: React.ReactNode}) => {

const [notes, updateNotes] = useState<any[]>([])
const [toggledFocus, changeToggledFocus] = useState<boolean>(false)

    
return(
    <GlobalContext.Provider value={[notes, updateNotes, toggledFocus, changeToggledFocus]} >
        <body className={`h-screen flex w-full overflow-hidden bg-[#1E293B] ${toggledFocus && 'blur-2xl'  }  `}>
        {children}
        </body>
    </GlobalContext.Provider>
)


}

export const useDetail = () => useContext(GlobalContext)
export default ContextWrap