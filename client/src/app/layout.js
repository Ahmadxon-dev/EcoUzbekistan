"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";
import {Provider, useDispatch} from "react-redux";
import store from "@/app/store/store";
import {useEffect} from "react";
import {loadFromStorage, setArray} from "@/app/store/userSlice";
import Head from "next/head";


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
    <head>
      <title>EcoUzbekistan</title>
      <link rel="icon" href="./logo.png"  sizes="64x64" />
      <meta name="favicon" content="none" />
    </head>
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
