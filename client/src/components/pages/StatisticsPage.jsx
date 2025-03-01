import {useNavigate} from "react-router-dom";
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
import {Loader2} from "lucide-react";
import {Badge} from "@/components/ui/badge.jsx";
import axios from "axios";

function StatisticsPage(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()



    useEffect(() => {

        async function fetchPosts() {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/getstatistics`);
                const fetchedData = data
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
            <Table className={`w-2/3 mx-auto space-y-6 p-6 border-gray-200 border-2 `}>
                <TableHeader >
                    <TableRow >
                        <TableHead className="w-[100px]">Viloyat</TableHead>
                        <TableHead>F.I.SH</TableHead>
                        <TableHead className="text-left">QoidaBuzarlik turi</TableHead>
                        <TableHead className={`text-center`}>Holati</TableHead>
                        <TableHead>Tasdiqlanganmi</TableHead>
                        <TableHead>Qo'shilgan sanasi</TableHead>
                        <TableHead>Qolgan vaqt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >

                    {
                        data.posts.map(post=>{
                            return <TableRow onClick={()=> navigate(`/statistics/${post._id}`)} key={post._id} className={" rounded-md shadow  hover:cursor-pointer"}>
                                <TableCell className="font-medium">{post.region}</TableCell>
                                <TableCell>{post.fish}</TableCell>
                                <TableCell className="text-left">{post.crimeType}</TableCell>
                                <TableCell className={`font-bold text-center`}><Badge variant={post.isDone?"default":(post.areTenDaysPassed?"destructive":"yellow")}>{post.isDone?"Bajarilgan":(post.areTenDaysPassed?"Bajarilmagan":"Jarayonda")} </Badge></TableCell>
                                <TableCell className={`font-bold`}>{post.isApproved?"Tasdiqlandi":"Tasdiqlanmadi"}</TableCell>
                                <TableCell>{post.createdAt?`${post.createdAt.toString().slice(0,10)}`:`sana yoq(hozircha)`}</TableCell>
                                <TableCell className={``}>{post.isDone?"Vaqtida Bajarilgan":(post.createdAt && (0>(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))?"Vaqt qolmadi":(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))+" kun"))}</TableCell>

                            </TableRow>
                        })

                    }
                </TableBody>


            </Table>
        </>
    );
}

export default  StatisticsPage;