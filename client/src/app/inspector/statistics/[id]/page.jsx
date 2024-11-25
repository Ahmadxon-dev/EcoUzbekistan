"use client"
import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";



function Page(props) {
    const params = useParams()
    const {id} = params
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const [data, setData] = useState({})
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const router = useRouter()
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/getstatistics/${id}`)
            .then(res => res.json())
            .then(data => setData(data.post))
    }, [])

    const postImage = () => {
        if (!image) {
            toast({
                title: "Hamma maydonlarni to'ldiring",
                variant: "destructive",
            })
            return
        }
        setLoading(true)

        const formdata = new FormData()
        formdata.append('file', image)
        formdata.append('upload_preset', "ecoUzbekistan")
        formdata.append("cloud_name", "dskh7ffuq")
        fetch("https://api.cloudinary.com/v1_1/dskh7ffuq/image/upload/", {
            method: 'post',
            body: formdata
        })
            .then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        if (url) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER}/updatestatistics/${id}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    proofImage: url,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        toast({
                            title: data.error,
                            variant: "destructive",
                        })
                    } else {
                        toast({
                            title: data.msg,
                            variant: "success"
                        })
                        setLoading(false)
                        router.push("/inspector/statistics")
                    }
                })
                .catch(err => console.log(err))
        }
    }, [url])
    return (
        <div className={`grid pt-20  items-center justify-center mx-auto`}>
            <img src={data.image} className={`mx-auto rounded-md`} alt={`rasm`} width={800} height={800}/>
            <Table className="border-collapse border border-slate-400 mt-5 w-[800px]">
                <TableHeader>
                    {/*<TableRow>*/}
                    {/*    <TableHead className="w-[200px] border border-slate-300 bg-slate-50 font-bold">Name</TableHead>*/}
                    {/*    <TableHead className="border border-slate-300 bg-slate-50 font-bold">Value</TableHead>*/}
                    {/*</TableRow>*/}
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="border border-slate-300 font-medium">Qoidabuzarlik turi</TableCell>
                        <TableCell className="border border-slate-300">{data.crimeType}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-slate-300 font-medium">Murojat qiluvchining F.I.SH</TableCell>
                        <TableCell className="border border-slate-300">{data.fish}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-slate-300 font-medium">Telefon raqami</TableCell>
                        <TableCell className="border border-slate-300">{data.contact}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-slate-300 font-medium">Turar viloyati</TableCell>
                        <TableCell className="border border-slate-300">{data.region}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="border border-slate-300 font-medium">Murojat qiluvchidan qo'shimcha ma'lumot</TableCell>
                        <TableCell className="border border-slate-300">{data.additionalData}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>


            {
                data.isDone && <>
                        <h1 className={`font-bold text-3xl my-3`}>Rasm joylangan</h1>
                        <img src={data.proofImage} className={`mx-auto rounded-md`} alt="joylanganrasm" width={800} height={800}/>
                    </>
            }
            {   !data.isDone && !data.areTenDaysPassed &&
                <>
                    <h1 className={`text-red-600 font-bold text-3xl`}>{10 - Math.floor((new Date() - new Date(data.createdAt) )/ (1000*60*60*24))} kun qoldi</h1>
                    <form className={`space-y-5 mt-16 max-w-md  mx-auto p-6 w-1/2 bg-card rounded-lg shadow`}>
                        <div className={``}>

                            <h1 className={`text-2xl text-center p-4`}>Muammoni hal qilinganligini isboti sifatida rasm
                                joylang</h1>
                            <div className="space-y-4">
                                <Label htmlFor="picture">Rasm tanlash</Label>
                                <Input id="picture" onChange={(e) => setImage(e.target.files[0])} type="file" required/>
                            </div>
                            <Button onClick={postImage} className={`space-y-4 mt-4`} disabled={loading && true}
                                    type="submit">
                                Saqlash
                                {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin"/> : ""}
                            </Button>
                        </div>
                    </form>
                </>

            }
            {
                data.areTenDaysPassed && <h1 className={`text-red-600 font-bold text-3xl`}>10 kun ichida to'g'irlanmagan</h1>
            }

        </div>
    );
}

export default Page;