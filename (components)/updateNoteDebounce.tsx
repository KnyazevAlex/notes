'use client'

import NotesInterface from '@/(components)/notesInterface'
import {motion} from 'motion/react'
import updateNote from '@/(server-components)/updateNote'
import { div, object } from 'motion/react-client'
import {useRef, useState, useTransition} from 'react'
import { useDebounce, useDebouncedCallback } from 'use-debounce'


const UpdateNote = ({title, subtitle, body, userId} : NotesInterface) => {
  
const titleRef = useRef<HTMLInputElement>(null)
const subtitleRef = useRef<HTMLInputElement>(null)
const bodyRef = useRef<HTMLInputElement>(null)

const [IsPending, startTransition] = useTransition()
const [errors, updErrors] = useState<any>({})


const saveChange = (
    ref: React.RefObject<HTMLElement | null>, 
    originalValue: string | undefined, 
    key: 'title' | 'subtitle' | 'body'
  ) => {

    const currentVal = ref.current?.innerText?.trim() || ''

    if (currentVal !== (originalValue || '')) {
      
    //reset errors when user attempts to save

      updErrors({})

      startTransition(async () => {
        try {

          const {error} = await updateNote(userId, key, currentVal)

          if(error)  updErrors(error)
        

        } catch (error) {
          console.error(`Failed to update ${key}:`, error)
        }
      })
    }
  }
const debouncedSave = useDebouncedCallback((ref: React.RefObject<HTMLElement | null>, value: string | undefined, key: 'title' | 'subtitle' | 'body') => {
  saveChange(ref,value, key )
}, 1000)

return(


<div className="flex items-center justify-center min-h-screen w-full bg-[#133a6d] p-4">
  
  {/* The Keep-style Note Card */}
  <div className="flex flex-col w-full max-w-xl h-100 bg-[#164179] rounded-2xl shadow-xl border border-white/10 p-6 overflow-hidden focus:border-0 focus:outline-0
  ">
 

    {errors.length &&

      <div className='text-red-400 text-shadow-black text-shadow-2xs'>
        <h1>Failed to save : {errors} </h1>
      </div>
    }
       {
      !IsPending && ! Object.keys(errors).length &&

      <div className='bg-green-400 font-bold text-white'>
        <h1>Saved</h1>
      </div>
    }
    
    {/* Title Area - Fixed at the top */}
    <div className="title mb-3 shrink-0"

    onBlur={() => saveChange(titleRef, title, "title")}
    onInput={() => debouncedSave(titleRef, title, "title")}

    >
      <h1 
      className="text-xl font-bold text-white cursor-pointer tracking-wide focus:outline-0"
      ref={titleRef}
      contentEditable={true}
      suppressContentEditableWarning={true}
      >
        {title}
      </h1>
    </div>
    
    {/* Subtitle Area - Fixed below title */}
  
    <div className="subtitle mb-4 shrink-0"
    onBlur={() => saveChange(subtitleRef,subtitle,"subtitle")}
    onInput={() => debouncedSave(subtitleRef,subtitle,"subtitle")}
      >
        <h2 
        className="text-sm font-semibold text-white/70 cursor-pointer focus:outline-0 "
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={subtitleRef}

        >
          {subtitle}
        </h2>
      </div>


    {/* Body Content - Auto overflows gracefully when text gets too long */}
    <div className="bodyDraft flex-1 overflow-y-auto pr-2 custom-scrollbar"
    onBlur={() => saveChange(bodyRef,body,"body")}
    onInput={() => debouncedSave(bodyRef,body,"body" )}
    >
      <section>
        <p 
        className="text-base font-normal text-white/90 whitespace-pre-wrap cursor-pointer wrap-break-words leading-relaxed focus:outline-0"
        ref={bodyRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        >
          {body}
        </p>
      </section>
    </div>

  </div>
</div>
)
}
export default UpdateNote