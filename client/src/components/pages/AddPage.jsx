import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Loader2} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useNavigate} from "react-router-dom";

function AddPage(props) {
    const [region, setRegion] = useState("")
    const [contact, setContact] = useState("")
    const [fish, setFish] = useState("")
    const [additionalData, setAdditionalData] = useState("")
    const [crimeType, setCrimeType] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {toast}= useToast()

    const postImage = () =>{
        if (!region || !contact || !fish || !additionalData || !crimeType || !image){
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
            body:formdata
        })
            .then(res=>res.json())
            .then(data=>setUrl(data.url))
            .catch(err=>console.log(err))
    }
    useEffect(()=>{

        if (url){
            fetch(`${import.meta.env.VITE_SERVER}/add`, {
                method: "post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    region,
                    fish,
                    contact,
                    additionalData,
                    crimeType,
                    image:url,
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    if (data.error){
                        toast({
                            title:data.error,
                            variant: "destructive",
                        })
                    }else{
                        toast({
                            title:"Qo'shildi",
                            variant:"success"
                        })
                        setLoading(false)
                        navigate("/statistics")
                    }
                })
                .catch(err=>console.log(err))
        }
    },[url])
    // console.log(crimeType)
    return (
        <>
            <form className="space-y-6 max-w-md mx-auto p-6 bg-card rounded-lg shadow mt-7">
                <Select className={`z-50`} onValueChange={value => setRegion(value)} name={"region"} required>

                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Viloyatni tanlang"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/*<SelectLabel>Fruits</SelectLabel>*/}
                            <SelectItem value="Andijon">Andijon</SelectItem>
                            <SelectItem value="Buxoro">Buxoro</SelectItem>
                            <SelectItem value="Farg'ona">Farg'ona</SelectItem>
                            <SelectItem value="Jizzax">Jizzax</SelectItem>
                            <SelectItem value="Xorazm">Xorazm</SelectItem>
                            <SelectItem value="Namangan">Namangan</SelectItem>
                            <SelectItem value="Navoiy">Navoiy</SelectItem>
                            <SelectItem value="Qashqadaryo">Qashqadaryo</SelectItem>
                            <SelectItem value="Samarqand">Samarqand</SelectItem>
                            <SelectItem value="Sirdaryo">Sirdaryo</SelectItem>
                            <SelectItem value="Surxondaryo">Surxondaryo</SelectItem>
                            <SelectItem value="Toshkent">Toshkent</SelectItem>
                            <SelectItem value="Qoraqalpog'iston">Qoraqalpogʻiston Respublikasi</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="space-y-2">
                    <Label htmlFor="name">F.I.SH</Label>
                    <Input
                        id="name"
                        name="fish"
                        value={fish}
                        onChange={e => setFish(e.target.value)}
                        placeholder={"Olimov Qo'chqor"}
                        required
                    />

                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact">Telefon raqamingizni kiriting</Label>
                    <Input
                        id="contact"
                        name="contact"
                        type="numbers"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        placeholder={"+123456789"}
                        required
                    />
                </div>
                <Select className={`z-50`} onValueChange={value => setCrimeType(value)} name={"crimeType"} required>

                    <SelectTrigger className="w-full">
                        <SelectValue id={"select_id"} placeholder="Qoidabuzarlik turi:"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/*<SelectLabel>Fruits</SelectLabel>*/}
                            <SelectItem value="Daraxt va butalarni noqonuniy kesish">Daraxt va butalarni noqonuniy
                                kesish</SelectItem>
                            <SelectItem value="Daraxtlarni noto'g'ri kesish">Daraxtlarni noto'g'ri kesish</SelectItem>
                            <SelectItem value="Daraxtlarga o'rnatilgan reklama jihozlari">Daraxtlarga o'rnatilgan
                                reklama jihozlari</SelectItem>
                            <SelectItem value="Daraxtlarning ildiz qismida sun'iy qoplama">Daraxtlarning ildiz qismida
                                sun'iy qoplama</SelectItem>
                            <SelectItem value="Daraxtlarga o'rnatilgan yoritish moslamalari">Daraxtlarga o'rnatilgan
                                yoritish moslamalari</SelectItem>
                            <SelectItem value="Chiqindilar to'planishi">Chiqindilar to'planishi</SelectItem>
                            <SelectItem value="Ruxsat etilmagan joyda olov yoqish">Ruxsat etilmagan joyda olov
                                yoqish</SelectItem>
                            <SelectItem value="Ruxsat etilmagan joyda chiqindi tashlash">Ruxsat etilmagan joyda chiqindi
                                tashlash</SelectItem>
                            <SelectItem value="Daryoga sanoat chiqindilarini/axlatlarini oqizish">Daryoga sanoat
                                chiqindilarini/axlatlarini oqizish</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="space-y-2">
                    <Label htmlFor="picture">Rasm tanlash</Label>
                    <Input id="picture" onChange={(e) => setImage(e.target.files[0])} type="file" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="data">Qo'shimcha ma'lumot</Label>
                    <Textarea
                        id="data"
                        name="additionalData"
                        value={additionalData}
                        onChange={e => setAdditionalData(e.target.value)}
                        className={`resize-none`}
                        required
                    />

                </div>
                <Button className={`w-full`} onClick={postImage} disabled={loading && true} type="submit">
                    Qo'shish
                    {loading?<Loader2 className="ml-2 h-4 w-4 animate-spin" />:""}
                </Button>
            </form>

        </>
    );
}

export default AddPage;