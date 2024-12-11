"use client"
import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {useSelector} from "react-redux";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.user.userData)
    const router = useRouter()
    // console.log(userData.region +" " + userData)

    useEffect(() => {

        async function fetchPosts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/inspector/notified-statistics/${userData.region}`, {
                    cache: 'no-store', // Optionally control caching
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                setData(fetchedData.data.notifications)
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchPosts();
    }, [userData]);


    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin"/>
    </div>

    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ogohlantirish yo'q</h1>
    </div>

    return (
        <>

            {
                data
                    ?
                        <>
                            <Table className={`w-2/3 mx-auto space-y-6 p-6 border-gray-200 border-2`}>
                               <TableHeader >
                                <TableRow >
                                    <TableHead className="">Id</TableHead>
                                    <TableHead>Ogohlantirish</TableHead>
                                    <TableHead>Bajarilganmi</TableHead>
                                    <TableHead>Ogohlantirilgan sanasi</TableHead>
                                </TableRow>
                            </TableHeader>
                        <TableBody>
                            {
                                data.map(post=>{
                                    return <TableRow key={post._id} onClick={()=>router.push(`/inspector/statistics/${post.postData._id}`)} className={`bg-red-400 hover:bg-red-300 rounded-md shadow hover:cursor-pointer `}>
                                        <TableCell>{post._id}</TableCell>
                                        <TableCell className={`font-bold w-1/4`}>{post.message}</TableCell>
                                        <TableCell>{!post.postData.isDone && "Bajarilmagan"}</TableCell>
                                        <TableCell>{post.time.toString().slice(0,10)}</TableCell>
                                    </TableRow>
                                })
                            }

                        </TableBody>
                            </Table>
                        </>
                    :
                    <h1 className={`text-center`}>Ogohlantirish yo'q</h1>
            }
        </>
    );
}

export default Page;