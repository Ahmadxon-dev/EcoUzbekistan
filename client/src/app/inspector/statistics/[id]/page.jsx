"use client"
import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from "next/navigation";
import Image from "next/image";
import {useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

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
        <div className={`grid  items-center justify-center mx-auto`}>
            <img src={data.image} className={`mx-auto`} alt={`rasm`} width={800} height={800}/>
            <h1 className={`text-5xl text-center p-3`}>{data.crimeType}</h1>
            <h2 className={`font-bold text-3xl p-2`}>Murojat qiluvchining F.I.SH: {data.fish}</h2>
            <h2 className={`font-bold text-3xl p-2`}>Telefon raqami: {data.contact}</h2>
            <h2 className={`font-bold text-3xl p-2`}>Turar viloyati:{data.region}</h2>
            <h2 className={`font-bold text-3xl p-2`}>Murojat qiluvchidan qo'shimcha ma'lumot: {data.additionalData}</h2>

            {
                data.isDone
                    ?
                    <>
                        <h1 className={`font-bold text-3xl p-3`}>Rasm joylangan</h1>
                        <img src={data.proofImage} className={`mx-auto`} alt="joylanganrasm" width={800} height={800}/>
                    </>
                    :
                    <form className={`space-y-5 mt-16 max-w-md mx-auto p-6 w-1/2 bg-card rounded-lg shadow`}>
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

            }

        </div>
    );
}

export default Page;