"use client"

import {motion} from 'motion/react'
import {useActionState, useEffect, useRef } from 'react'
import saveNote from '@/(server-components)/saveNote'
import { MessageSquareWarning } from 'lucide-react';



const createNote = () => {

const initialState : any = {success: '', errors: {}}

const [state, formAction, pending ] = useActionState(saveNote, initialState)

const formRef = useRef<HTMLFormElement>(null)

useEffect(() => {
  console.log(state)
    if(state?.success){
        formRef.current?.reset()
    }
    
}, [state?.success])



return(
<motion.div 
className="max-w-3xl mx-auto bg-[#1E293B] rounded-xl shadow-lg border border-slate-700/50 overflow-hidden"
initial={{ scale: 0 }} animate={{ scale: 1 }}

>
  <div className="p-6 border-b border-slate-700/50">
    <h2 className="text-xl font-semibold text-slate-100">Draft a New Note</h2>
    <p className="text-sm text-slate-400 mt-1">
      Fill out the fields below to capture your thoughts.
    </p>
  </div>

  <form 
  className="p-6 space-y-6" 
  ref={formRef}
  action={formAction}>
  
    {/* Title Field */}
    <div className="space-y-2">
      <label htmlFor="title" className="block text-sm font-medium text-slate-300">
        Title <span className="text-rose-400">*</span>
      </label>
      {state.errors.title && <motion.h1 className='font-bold text-red-400 ' initial={{ scale: 0 }} animate={{ scale: 1 }}   transition={{duration: 0.25}} > <MessageSquareWarning /> {state.errors.title}</motion.h1>}
      <input
        type="text"
        id="title"
        name="title"
        required
        placeholder='e.g., Project Blueprint'
        className={`w-full px-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
      />
    </div>

    {/* Subtitle Field */}
    <div className="space-y-2">
      <label htmlFor="subtitle" className="block text-sm font-medium text-slate-300">
        Subtitle <span className="text-rose-400">*</span>
      </label>
      {state.errors.subtitle && <motion.h1 className='font-bold text-red-400'  initial={{ scale: 0 }} animate={{ scale: 1 }}  transition={{duration:0.25}}> <MessageSquareWarning/> {state.errors.subtitle}</motion.h1>}
      <input
        type="text"
        id="subtitle"
        name="subtitle"
        required
        placeholder="e.g., Architecture and tech stack overview"
        className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
    </div>

    {/* Body Field */}
    <div className="space-y-2">
      <label htmlFor="body" className="block text-sm font-medium text-slate-300">
        Body Content <span className="text-rose-400">*</span>
      </label>
       {state.errors.body && <motion.h1 className='font-bold text-red-400' initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{duration: 0.25}}> <MessageSquareWarning/> {state.errors.body}</motion.h1>}
      <textarea
        id="body"
        name="body"
        required
        rows={8}
        placeholder="Start typing your note details here..."
        className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
      />
    </div>

    {/* Form Actions */}
    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-700/50">
      <a
        type="button"
        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 transition"
        href= "/home"
      >
        Cancel
      </a>
      <button
        type="submit"
        className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow transition"
        disabled={pending}
      >
        {pending ? 'Submitting...' : 'Create note!'}
      </button>
    </div>
  </form>
</motion.div>
)
}
    

export default createNote