"use client"
import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {useSelector} from "react-redux";

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state=>state.user.userData)



    useEffect(()=>{
        setData(userData.notifications)
    }, [])



    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ogohlantirish yo'q</h1>
    </div>

    return (
        <div className={`w-2/3 mx-auto space-y-6 p-6 `}>
            {data.map(item=>{
                return <li key={item._id}>{item.message}</li>
            })}
        </div>
    );
}

export default Page;