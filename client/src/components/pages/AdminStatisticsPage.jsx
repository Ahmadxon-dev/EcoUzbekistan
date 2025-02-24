import React, {useEffect, useState} from 'react';
import {Check, Loader2} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useToast} from "@/hooks/use-toast";
import {useNavigate} from "react-router-dom";

function Page(props) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState("")
    const navigate = useNavigate()
    const { toast } = useToast()
    const approvePost = async (id)=>{
        await fetch(`${import.meta.env.VITE_SERVER}/admin/approve`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                id:id
            })
        })
            .then(res=>res.json())
            .then(data=>{
                setData(data)
                toast({
                    title: data.msg,
                    variant: "success",
                })
            })
    }
    const sendNotification = async (message, region, postId ) => {
        await fetch(`${import.meta.env.VITE_SERVER}/admin/send-message`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                message,
                region,
                postId
            })
        })
            .then(res=>res.json())
            .then(data=> {
                setNotification("")
                setData(data)
                toast({
                    title:data.msg,
                    variant: "success",
                })
            })
    }
    useEffect(() => {

        async function fetchPosts() {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER}/getstatistics`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                setData(fetchedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
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
                data
                    ?
                    <>
                        <Table className={`w-2/3 mx-auto space-y-6 p-6 border-gray-200 border-2 z-0 `}>
                            <TableHeader >
                                <TableRow >
                                    <TableHead className="w-[100px]">Viloyat</TableHead>
                                    <TableHead>F.I.SH</TableHead>
                                    <TableHead className="text-left">QoidaBuzarlik turi</TableHead>
                                    <TableHead>Bajarilganmi</TableHead>
                                    <TableHead>Tasdiqlanganmi</TableHead>
                                    <TableHead>Qo'shilgan sanasi</TableHead>
                                    <TableHead>Qolgan vaqt</TableHead>
                                    <TableHead className={`flex mx-auto items-center justify-center`}>Amallar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody >

                                {
                                    data.posts.map(post=>{
                                        return <TableRow key={post._id} className={post.isDone?"bg-green-300 hover:bg-green-200 hover:cursor-pointer":(post.areTenDaysPassed?"bg-red-400 hover:bg-red-300":"")+  " rounded-md shadow  hover:cursor-pointer"}>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }} className="font-medium">{post.region}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }}>{post.fish}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }} className="text-left">{post.crimeType}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }} className={`font-bold`}>{post.isDone?"Bajarilgan":(post.areTenDaysPassed?"Bajarilmagan":"Jarayonda")}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }} className={`font-bold`}>{post.isApproved?`Tasdiqlangan`:"Tasdiqlanmadi"}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }}>{post.createdAt?`${post.createdAt.toString().slice(0,10)}`:`sana yoq(hozircha)`}</TableCell>
                                            <TableCell onClick={()=>{
                                                navigate(`/statistics/${post._id}`)
                                            }} className={``}>{post.isDone?"Vaqtida Bajarilgan":(post.createdAt && (0>(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))?"Vaqt qolmadi":(10 - Math.floor((new Date() - new Date(post.createdAt) )/ (1000*60*60*24)))))}</TableCell>
                                            <TableCell className={`flex mx-auto justify-center font-bold`}>{post.isDone && !post.isApproved && <Button onClick={()=>approvePost(post._id)}>Tasdiqlash</Button>} {post.isApproved && <Check/>} {post.isnotified && "Ogohlantirilgan"} { !post.isDone && post.areTenDaysPassed && !post.isnotified &&<Dialog className={`relative z-50`}>
                                                <DialogTrigger asChild>
                                                    <Button  className={`relative z-50`}>Ogohlantirish</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Ogohlantirish Yuborish</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            {/*<Label htmlFor="username" className="text-right">*/}
                                                            {/*    Ogohlantirish*/}
                                                            {/*</Label>*/}
                                                            <Input
                                                                className="col-span-6"
                                                                value={notification}
                                                                onChange={e=>setNotification(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button onClick={()=>sendNotification(notification, post.region, post._id)} type="submit">Yubormoq</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog> }</TableCell>
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