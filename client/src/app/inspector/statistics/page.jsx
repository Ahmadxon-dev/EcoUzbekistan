"use client"
import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    const userData = useSelector(state=>state.user.userData)
    useEffect(() => {

        async function fetchPosts() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/getstatistics`, {
                    cache: 'no-store', // Optionally control caching
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                console.log(fetchedData)
                const filtered = fetchedData.posts.filter(post => post.region.toLowerCase() === userData.region.toLowerCase());
                // setData(fetchedData.posts.filter(post=> post.region ==="Andijon"));
                console.log(filtered)
                setData(filtered)
                console.log(fetchedData)
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ma'lumot yo'q</h1>
    </div>

    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin" />
    </div>
    return (
        <>
            <Table className={`w-1/2 mx-auto`}>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Viloyat</TableHead>
                        <TableHead>F.I.SH</TableHead>
                        <TableHead>Tel. raqami</TableHead>
                        <TableHead className="text-right">QoidaBuzarlik turi</TableHead>
                        <TableHead>Bajarilganmi</TableHead>
                        <TableHead>Tasdiqlanganmi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        data ?
                        data.map(post=>{
                            return <TableRow onClick={()=>router.push(`statistics/${post._id}`)} className={`cursor-pointer`} key={post._id} >
                                <TableCell className="font-medium">{post.region}</TableCell>
                                <TableCell>{post.fish}</TableCell>
                                <TableCell>{post.contact}</TableCell>
                                <TableCell className="text-right">{post.crimeType}</TableCell>
                                <TableCell className={`font-bold`}>{post.isDone?"Bajarilgan":"Jarayonda"}</TableCell>
                                <TableCell className={`font-bold`}>{post.isApproved?"Tasdiqlandi":"Tasdiqlanmadi"}</TableCell>
                            </TableRow>
                        })
                            :
                            <>
                                <h1>no posts</h1>
                            </>

                    }
                </TableBody>


            </Table>
        </>
    );
}

export default Page;