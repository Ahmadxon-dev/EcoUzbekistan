"use client";
import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {log} from "next/dist/server/typescript/utils";
import {Loader2} from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/userSlice';

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



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
                setData(fetchedData);
                // console.log(fetchedData)
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
            <Table className={`w-2/3 mx-auto`}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Viloyat</TableHead>
                        <TableHead>F.I.SH</TableHead>
                        <TableHead>Tel. raqami</TableHead>
                        <TableHead className="text-right">QoidaBuzarlik turi</TableHead>
                        <TableHead>Bajarilganmi</TableHead>
                        <TableHead>Tasdiqlanganmi</TableHead>
                        <TableHead>Qo'shilgan sanasi</TableHead>
                        <TableHead>Qolgan vaqt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                     data.posts.map(post=>{
                       return <TableRow key={post._id} >
                        <TableCell className="font-medium">{post.region}</TableCell>
                        <TableCell>{post.fish}</TableCell>
                        <TableCell>{post.contact}</TableCell>
                        <TableCell className="text-right">{post.crimeType}</TableCell>
                        <TableCell className={`font-bold`}>{post.isDone?"Bajarilgan":"Jarayonda"}</TableCell>
                       <TableCell className={`font-bold`}>{post.isApproved?"Tasdiqlandi":"Tasdiqlanmadi"}</TableCell>
                       <TableCell>{post.createdAt?`${post.createdAt.toString().slice(0,10)}`:`sana yoq(hozircha)`}</TableCell>
                       <TableCell>{post.createdAt && (10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))}</TableCell>
                    </TableRow>
                })

                    }
                </TableBody>


            </Table>
        </>
    );
}

export default Page;