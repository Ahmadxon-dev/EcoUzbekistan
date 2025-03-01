import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {useSelector} from "react-redux";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useNavigate} from "react-router-dom";

function Page(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.user.userData)
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchPosts() {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER}/inspector/notified-statistics/${userData.region}`, {
                    cache: 'no-store', // Optionally control caching
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                console.log(fetchedData.data.notifications)
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
        <h1 className={`text-3xl`}>Ogohlantirish yo'q</h1>
    </div>

    return (
        <>

            {
                data.length>0
                    ?
                    <>
                        <Table className={`w-7/12 mx-auto justify-center items-center space-y-6 p-6 border-gray-200 border-2`}>
                            <TableHeader >
                                <TableRow >
                                    <TableHead>Ogohlantirish</TableHead>
                                    <TableHead>Holati</TableHead>
                                    <TableHead>Ogohlantirilgan sanasi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map(post=>{
                                        return <TableRow key={post._id} onClick={()=>navigate(`/inspector/statistics/${post.postData._id}`)} className={`bg-red-400 hover:bg-red-300 rounded-md shadow hover:cursor-pointer `}>
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