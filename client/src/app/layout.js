"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";
import {Provider} from "react-redux";
import store from "@/app/store/store";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
//
// export const metadata = {
//   title: "EcoUzbekistan",
//   description: "",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Provider store={store}>
        <Navbar />
        {children}
        <Toaster />
      </Provider>
      </body>
    </html>
  );
}