"use client"

import { motion } from "motion/react"
import { SiGoogle, SiGithub } from "@icons-pack/react-simple-icons"
import Link from "next/link"

type Props = {
  mode?: "login" | "signup"
}

export default function AuthForm({ mode = "signup" }: Props) {
  const isSignup = mode === "signup"

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-blue-800 px-4">
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex w-full max-w-md flex-col items-center rounded-xl bg-blue-700 p-6 shadow-2xl"
      >
        <h1 className="my-4 text-center text-2xl font-bold text-white">
          {isSignup ? "Create an account" : "Welcome back"}
        </h1>

        <div className="flex w-full flex-col gap-4">
       
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-blue-400 px-4 py-3 text-black placeholder:text-black/60 outline-none focus:ring-2 focus:ring-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-blue-400 px-4 py-3 text-black placeholder:text-black/60 outline-none focus:ring-2 focus:ring-white/20"
          />

          {/* OAuth icons (kept exactly like yours) */}
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
