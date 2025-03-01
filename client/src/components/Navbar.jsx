import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clear, setArray} from "@/store/userSlice";
import {Link} from "react-router-dom";
import logo_green from "../assets/logo.png"
import logo_white_green from "../assets/logo_white_green.png"
import logo_light_green from "../assets/logo_light_green.png"
import logo_white from "../assets/logo_white.png"
function Navbar(props) {
    const userData = useSelector(state=>state.user.userData)
    const dispatch = useDispatch()
    const [isHovered, setIsHovered] = useState(false);
    const [isUserActive, setIsUserActive] = useState(false)
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNlNDUzNjgyODIwZjAwMDg0NmQ0NzAiLCJpYXQiOjE3NDAyNDI3OTd9.9M1UOMAaPnqOHPZdTpeHLe-XUtseQCSNgulbATlin5k")
    const getUser = async ()=>{
        const jwt = localStorage.getItem("token")
        if (!jwt) return
        if (jwt)
            setIsUserActive(true)
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
                .then(data=> {
                    dispatch(setArray(data))
                })
    }
    useEffect(() => {
        getUser()
    }, []);


    return (
        <>
            <div className="absolute top-0 left-0 right-0 z-50">
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 to-transparent pointer-events-none"></div>
                <header className="relative flex h-16 items-center justify-between px-4 md:px-6">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img
                            src={isHovered ? logo_light_green : logo_white_green}
                            width={52}
                            height={40}
                            fetchPriority="high"
                            alt="EcoUzbekistan Logo"
                        />
                        <div className="flex flex-col justify-center gap-0 ">
                            <span className={`text-xl p-0 m-0  ${isHovered ? "text-[#5DB432]":"text-white"}`} style={{ lineHeight: '1' }}>Eco  </span>
                            <span className={`text-xl p-0 m-0 ${isHovered ? "text-[#5DB432]":"text-white"}`} style={{ lineHeight: '1' }}>Uzbekistan</span>
                        </div>

                    </Link>
                    <nav className="flex items-center gap-4 text-md font-medium">
                        { !isUserActive && <>
                            <Link to="/statistics" className="text-white transition-colors hover:text-[#5DB432]">
                                Statistika
                            </Link>
                            <Link to="/inspector" className="text-white transition-colors hover:text-[#5DB432]">
                                Inspektor
                            </Link>
                        </>
                        }
                        {userData.role === "inspector" ? (
                            <>
                                <Link to="/inspector/statistics" className="text-white transition-colors hover:text-[#5DB432]">
                                    Statistika
                                </Link>
                                <Link to="/inspector/notifications" className="text-white transition-colors hover:text-[#5DB432]">
                                    Ogohlantirishlar
                                </Link>
                                <Link
                                    to="/inspector"
                                    onClick={() => {
                                        localStorage.clear()
                                        dispatch(clear())
                                    }}
                                    className="text-white transition-colors hover:text-[#5DB432]"
                                >
                                    Chiqish
                                </Link>
                            </>
                        ) : userData.role === "admin" ? (
                            <>
                                <Link to="/admin/statistics" className="text-white transition-colors hover:text-[#5DB432]">
                                    Statistika
                                </Link>
                                <Link to="/inspectorlist" className="text-white transition-colors hover:text-[#5DB432]">
                                    Inspektorlar
                                </Link>
                                <Link
                                    to="/inspector"
                                    onClick={() => {
                                        localStorage.clear()
                                        dispatch(clear())
                                    }}
                                    className="text-white transition-colors hover:text-[#5DB432]"
                                >
                                    Chiqish
                                </Link>
                            </>
                        ) : null}
                    </nav>
                </header>
            </div>
        </>
    );
}

export default Navbar;