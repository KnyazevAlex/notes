"use client"

import { motion, scale } from "motion/react"
import { useState, useActionState } from "react"
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons"
import Link from "next/link"
import signUp from "@/(server-components)/signUp"
import { FormState } from "@/(server-components)/zodSignUpSchema"
import login from "@/(server-components)/loginAction"
import { MessageSquareWarning } from 'lucide-react';
import { Eye, EyeOff} from "lucide-react"


type Props = {
  mode?: "login" | "signup"
}


export default function AuthForm({ mode = "signup" }: Props) {

const isSignup = mode === "signup"

const defaultState: FormState = {
  errors: {
    fieldErrors: {
      name: [],
      email: [],
      password: [] 
    },
    formErrors: [] 
  },
  message: ''
};

const [signUpState, signUpAction, signUpPending ] = useActionState(signUp, defaultState )

const [loginState, loginAction, loginPending ] = useActionState(login, defaultState )

//password eye
const [visible, setVisible] = useState<boolean>(false)

const acitveState = isSignup ? signUpState : loginState

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-blue-800 px-4">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-md flex-col items-center rounded-xl bg-blue-700 p-6 shadow-2xl"
        action={isSignup ? signUpAction : loginAction}
      >
        <h1 className="my-4 text-center text-2xl font-bold text-white">
          {isSignup ? "Create an account" : "Welcome back"}
        </h1>

        {acitveState.errors.formErrors && acitveState.errors.formErrors.length > 0&&
          <motion.h1

          className="my-2 font-bold text-red-400"
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{duration: 0.1}} 

           >
            {acitveState.errors.formErrors}
          </motion.h1>
        }

        <div className="flex w-full flex-col gap-4">
          {isSignup && 
        <>
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-xl bg-blue-400 px-4 py-3 text-black placeholder:text-black/60 outline-none focus:ring-2 focus:ring-white/20"
            name="name"
          />

        {acitveState.errors.fieldErrors.name && acitveState.errors.fieldErrors.name.length > 0 &&
         <motion.h1 
          className='font-bold text-red-400 '
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{duration: 0.25}} > 
          <MessageSquareWarning /> {acitveState.errors.fieldErrors.name}
        </motion.h1>
         }

      </>
          }
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-blue-400 px-4 py-3 text-black placeholder:text-black/60 outline-none focus:ring-2 focus:ring-white/20"
            name="email"
          />

         {acitveState.errors?.fieldErrors?.email && acitveState.errors.fieldErrors.email.length > 0 &&
         <motion.h1 
          className='font-bold text-red-400 '
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{duration: 0.25}} > 
          <MessageSquareWarning /> {acitveState.errors.fieldErrors.email}
        </motion.h1>
         }
          
          <div className="relative">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="Password"
            className=" w-full rounded-xl bg-blue-400 px-4 py-3 text-black placeholder:text-black/60 outline-none focus:ring-2 focus:ring-white/20"
            name="password"
          />
          <motion.button 
          
          type="button"
          className="absolute right-1 top-3 cursor-pointer"
          whileHover={{scale:1.2}}
          onClick={() => setVisible(!visible)}
          >
          {
          visible ? <Eye></Eye>  : <EyeOff></EyeOff>
          }

          </motion.button>
          
          </div>

         {acitveState.errors.fieldErrors.password && acitveState.errors.fieldErrors.password.length > 0 &&
         <motion.ul 
          className='font-bold text-red-400 '
          initial={{ scale: 0 }} animate={{ scale: 1 }} 
          transition={{duration: 0.25}} > 
  
          <MessageSquareWarning /> {acitveState.errors.fieldErrors.password.map(err => (
            
              <li key={err + '123'}>{err}</li>
           
          ))}
        </motion.ul>
         }
         
          <div className="flex justify-center gap-10 py-2">
            <SiGoogle size={30} className="cursor-pointer hover:scale-110 transition" />
            <SiGithub size={30} className="cursor-pointer hover:scale-110 transition" />
          </div>

          <p className="text-center text-sm text-white/80">
            {isSignup ? (
              <>
                Have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </>
            ) : (
              <>
                No account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </>
            )}
          </p>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="mt-2 rounded-xl bg-[#1990ec] p-3 font-semibold text-white shadow-lg"
          >
            {isSignup ? "Create Account" : "Login"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  )
}
