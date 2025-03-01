import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function InspectorStatisticsPage(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state=>state.user.userData)

    useEffect(() => {

        async function fetchPosts() {
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/getstatistics`);
                const fetchedData = data
                const filtered = fetchedData.posts.filter(post => post.region.toLowerCase() === userData.region.toLowerCase());
                setData(filtered)
                setLoading(false);
                // setData(fetchedData.posts.filter(post=> post.region ==="Andijon"));
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            }
        }
        fetchPosts();
    }, [userData]);


    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin" />
    </div>
    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ma'lumot yo'q</h1>
    </div>
    return (
        <>
            {
                userData.role ==="inspector"
                    ?
                    <>
                        <h1 className={`w-2/3 mx-auto py-2 text-3xl text-left`}>{userData.region}</h1>

                        {
                            data.length>0
                                ?
                                <>
                                    <Table className={`w-2/3 mx-auto space-y-6 p-6 border-gray-200 border-2 `}>
                                        <TableHeader>
                                            <TableRow>
                                                {/*<TableHead>Id</TableHead>*/}
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
                                            {data.map(post => {
                                                return <TableRow onClick={() => navigate(`/inspector/statistics/${post._id}`)}
                                                                 key={post._id}
                                                                 className={post.isDone ? "bg-green-300 hover:bg-green-200 hover:cursor-pointer" : (post.areTenDaysPassed ? "bg-red-400 hover:bg-red-300" : "") + "  hover:cursor-pointer"}>
                                                    {/*<TableCell>{post._id}</TableCell>*/}
                                                    <TableCell className="font-medium">{post.region}</TableCell>
                                                    <TableCell>{post.fish}</TableCell>
                                                    <TableCell>{post.contact}</TableCell>
                                                    <TableCell className="text-right">{post.crimeType}</TableCell>
                                                    <TableCell
                                                        className={`font-bold`}>{post.isDone ? "Bajarilgan" : (post.areTenDaysPassed ? "Bajarilmagan" : "Jarayonda")}</TableCell>
                                                    <TableCell
                                                        className={`font-bold`}>{post.isApproved ? "Tasdiqlandi" : "Tasdiqlanmadi"}</TableCell>
                                                    <TableCell>{post.createdAt ? `${post.createdAt.toString().slice(0, 10)}` : `sana yoq(hozircha)`}</TableCell>
                                                    <TableCell
                                                        className={``}>{post.isDone ? "Vaqtida Bajarilgan" : (post.createdAt && (0 > (10 - Math.floor((new Date() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24))) ? "Vaqt qolmadi" : (10 - Math.floor((new Date() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24)))+" kun"))}</TableCell>
                                                </TableRow>
                                            })

                                            }
                                        </TableBody>
                                    </Table>
                                </>
                                :
                                <>
                                    <h1 className={`text-center`}>Ma'lumot yo'q</h1>
                                </>
                        }





                    </>
                    :
                    <h1>Admin page</h1>
            }
        </>

    );
}

export default InspectorStatisticsPage;