import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Mynavbar from "@/components/Mynavbar";
import Mysidbare from "@/components/Mysidbare";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySchool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
         
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                
              },
            }}
          />
             <div className='flex'>
     <Mysidbare />
      <div className="flex-1 ml-64 mt-16">
        <Mynavbar />
        <div className="p-4">
         {children}
        </div>
        </div>
        </div>
        </main>
       
        </body>
    </html>
  );
}
