"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    useEffect(() => {

        async function fetchPosts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/getstatistics`, {
                    // cache: 'no-store', // Optionally control caching

                    // cache: 'force-cache'
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                setData(fetchedData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);
    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin" />
    </div>

    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ma'lumot yo'q</h1>
    </div>

    return (
        <>
            {
                data.posts.length>0
                    ?
                    <>
                        <Table className={`w-2/3 mx-auto space-y-6 p-6 border-gray-200 border-2 `}>
                            <TableHeader >
                                <TableRow >
                                    <TableHead className="w-[100px]">Viloyat</TableHead>
                                    <TableHead>F.I.SH</TableHead>
                                    <TableHead className="text-left">QoidaBuzarlik turi</TableHead>
                                    <TableHead>Bajarilganmi</TableHead>
                                    <TableHead>Tasdiqlanganmi</TableHead>
                                    <TableHead>Qo'shilgan sanasi</TableHead>
                                    <TableHead>Qolgan vaqt</TableHead>
                                    <TableHead>Amallar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >

                                {
                                    data.posts.map(post=>{
                                        return <TableRow onClick={()=> router.push(`statistics/${post._id}`)} key={post._id} className={post.isDone?"bg-green-300 hover:bg-green-200 hover:cursor-pointer":(post.areTenDaysPassed?"bg-red-400 hover:bg-red-300":"")+  " rounded-md shadow  hover:cursor-pointer"}>
                                            <TableCell className="font-medium">{post.region}</TableCell>
                                            <TableCell>{post.fish}</TableCell>
                                            <TableCell className="text-left">{post.crimeType}</TableCell>
                                            <TableCell className={`font-bold`}>{post.isDone?"Bajarilgan":(post.areTenDaysPassed?"Bajarilmagan":"Jarayonda")}</TableCell>
                                            <TableCell className={`font-bold`}>{post.isApproved?"Tasdiqlandi":"Tasdiqlanmadi"}</TableCell>
                                            <TableCell>{post.createdAt?`${post.createdAt.toString().slice(0,10)}`:`sana yoq(hozircha)`}</TableCell>
                                            <TableCell className={``}>{post.isDone?"Vaqtida Bajarilgan":(post.createdAt && (0>(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))?"Vaqt qolmadi":(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))))}</TableCell>
                                            <TableCell>{!post.isApproved && <Button>Tasdiqlash</Button>}</TableCell>
                                        </TableRow>
                                    })

                                }
                            </TableBody>


                        </Table>
                    </>
                    :
                    <h1>Statistika bo'sh</h1>
            }
        </>
    );
}

export default Page;