"use client"
import React, {useEffect} from 'react';
import Link from "next/link";
import {Package2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {clear, setArray} from "@/app/store/userSlice";

function Navbar(props) {
    const userData = useSelector(state=>state.user.userData)
    const dispatch = useDispatch()
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("inspector")) || {};
        dispatch(setArray(data));
    }, []);


    return (
        <>
            <div className="flex  w-full flex-col ">
                {/*min-h-screen*/}
                <header className="sticky top-0 flex h-16 items-center justify-between  bg-background px-4 md:px-6 bg-gray-800">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        {/*<Package2 className="h-6 w-6" />*/}
                        <span className={`transition-colors text-white hover:text-green-700 text-xl `}>EcoUzbekistan</span>
                        {/*<span className="self-center text-2xl font-semibold whitespace-nowrap text-green-700 ">*/}
                        {/*/!*Eco<span className="text-white">Uzbekistan</span>*!/</span>*/}
                    </Link>
                    <nav className="flex items-center gap-4 text-md font-medium">
                        {
                            userData.role === "inspector" ? (
                                <>
                                    <Link
                                        href="/inspector/statistics"

                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Statistika
                                    </Link>
                                    <Link
                                        href="/inspector"
                                        onClick={() => {
                                            localStorage.clear();
                                            dispatch(clear());
                                        }}
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Chiqish
                                    </Link>
                                </>
                            ) : !userData.role ? (
                                <>
                                    <Link
                                        href="/statistics"
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Statistika
                                    </Link>
                                    <Link
                                        href="/add"
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Qo'shish
                                    </Link>
                                    <Link
                                        href="/inspector"
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Inspektor
                                    </Link>
                                </>
                            ) : userData.role === "admin" ? (
                                <>
                                    <Link
                                        href="/admin/statistics"
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Statistika
                                    </Link>
                                    <Link
                                        href="/inspectorlist"
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Inspektorlar
                                    </Link>
                                    <Link
                                        href="/inspector"
                                        onClick={() => {
                                            localStorage.clear();
                                            dispatch(clear());
                                        }}
                                        className="text-white transition-colors hover:text-green-700"
                                    >
                                        Chiqish
                                    </Link>

                                </>
                            ) : null

                        }




                    </nav>
                </header>
            </div>
        </>
    );
}

export default Navbar;