'use client'

import { Search, Bell } from "lucide-react"
import Image from "next/image"
import { useState } from "react"





const Header = () => {
  const [notifications, sendNotification] = useState(false)


   return (
    // Change: Flex container to hold the Search (left/center) and User (right)
     <>
  
    <header className="bg-[#3b4b63] px-6 py-4 flex items-center justify-between gap-4">

   {/* Notes Bar (notes that users have made) */}
      

      {/* 1. Search Bar Container */}
      <div className="flex justify-end relative w-screen">
        <div className="absolute inset-y-0  flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400 relative " />
        </div>
        <input 
          type="text" 
          name="search" 
          id="search"
          placeholder="Search notes..." 
          className="w-80 pl-1 pr-4 py-2 bg-[#334155] abosolute text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all placeholder:text-slate-500 max-xl:w-50"
        />

 
      </div>
      
      {/* 2. User Interactivity (Right Side) */}
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell size={24} />
          {/* Add a dot if there are notifications */}
          { notifications &&
          <span className="absolute top-0 right-0 w-2 h-2 bg-teal-400 rounded-full border-2 border-[#1E293B]"></span>
          }
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-slate-100">User</p>
          </div>
          <div className="rounded-full overflow-hidden border-2 border-slate-700">
            <Image
              src="/defaultuserpfp.webp"
              width={40}
              height={40}
              alt="User profile"
              className="object-cover"
            />
          </div>
        </div>
      </div>

    </header>
    </>
  )
}

export default Header