import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import logo_green from "../assets/logo.png"
import logo_white_green from "../assets/logo_white_green.png"
import logo_light_green from "../assets/logo_light_green.png"
import logo_white from "../assets/logo_white.png"
import {Link} from "react-router-dom";
import {setArray} from "@/store/userSlice.js";

function Navbar2(props) {
    const userData = useSelector(state => state.user.userData)
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false);
    const getUser = async ()=>{
        const jwt = localStorage.getItem("token")
        if (jwt)
            await fetch(`${import.meta.env.VITE_SERVER}/inspector/getuser`, {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    token: jwt
                })
            })
                .then(res=>res.json())
                .then(data=>dispatch(setArray(data)))
    }
    useEffect(() => {
        getUser()
    }, []);

    return (
        <div className="flex w-full flex-col ">
            <header
                className="sticky top-0 flex h-16 items-center justify-between bg-background px-4 md:px-6 bg-gray-800">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                    <img src={isHovered ? logo_green : logo_white_green} className={`h-10 w-13`} fetchPriority="high"
                         alt=""/>
                    <div className="flex flex-col justify-center gap-0 ">
                        <span className={`text-xl p-0 m-0  ${isHovered ? "text-green-700" : "text-white"}`}
                              style={{lineHeight: '1'}}>Eco  </span>
                        <span className={`text-xl p-0 m-0 ${isHovered ? "text-green-700" : "text-white"}`}
                              style={{lineHeight: '1'}}>Uzbekistan</span>
                    </div>
                </Link>
                <nav className="flex items-center gap-4 text-md font-medium">
                    { userData.role === "inspector" ? (
                        <> <Link to="/inspector/statistics"

                                 className="text-white transition-colors hover:text-green-700"
                        >
                            Statistika
                        </Link>
                            <Link
                                to="/inspector/notifications"

                                className="text-white transition-colors hover:text-green-700"
                            >
                                Ogohlantirishlar
                            </Link>
                            <Link
                                to="/inspector"
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
                                to="/statistics"
                                className="text-white transition-colors hover:text-green-700"
                            >
                                Statistika
                            </Link>
                            {/*<Link*/}
                            {/*    to="/add"*/}
                            {/*    className="text-white transition-colors hover:text-green-700"*/}
                            {/*>*/}
                            {/*    Qo'shish*/}
                            {/*</Link>*/}
                            <Link
                                to="/inspector"
                                className="text-white transition-colors hover:text-green-700"
                            >
                                Inspektor
                            </Link>
                        </>
                    ) : userData.role === "admin" ? (
                        <>
                            <Link
                                to="/admin/statistics"
                                className="text-white transition-colors hover:text-green-700"
                            >
                                Statistika
                            </Link>
                            <Link
                                to="/inspectorlist"
                                className="text-white transition-colors hover:text-green-700"
                            >
                                Inspektorlar
                            </Link>
                            <Link
                                to="/inspector"
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
    );
}

export default Navbar2;