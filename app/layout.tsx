import type { Metadata } from "next";
import {Lexend } from "next/font/google";
import Header from "@/(components)/Header";
import Sidebar from "@/(components)/Sidebar";
import Createnotes from "@/(components)/Createnotes";
import ContextWrap from "@/(components)/contextWrapper";
import getUserModel from "@/(server-components)/models/UserAuthModel";
import connectToMongo from "@/(server-components)/mongoConnect";
import "./globals.css";



const lexendFont = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Fullstack Notes App",

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const conn = await connectToMongo('auth')
  const authModel = getUserModel(conn)
  
  return (
    <html
      lang="en"
      className={`${lexendFont.variable} font-lexend h-full antialiased`}
    >
     
     <ContextWrap>  
     
     {children}

     </ContextWrap>
    
    
    </html>
  );
}
