"use client";
import React, {useState} from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {toast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {setArray, setRole, setUser} from "@/app/store/userSlice";
import {Loader2} from "lucide-react";
function Page(props) {
    const [logEmail, setLogEmail] = useState("")
    const [logPassword, setLogPassword] = useState("")
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const state = useSelector(state=> state.user)
    const router = useRouter()
        const handleSubmit = ()=>{
            setLoading(true)
            if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(logEmail)){
                toast({
                    variant: "destructive",
                    title:"Email xato"
                })
                return
            }
            if (!logPassword){
                toast({
                    variant: "destructive",
                    title:"Parolni kiriting"
                })
                return
            }

            fetch(`${process.env.NEXT_PUBLIC_SERVER}/inspector/signin`, {
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: logEmail,
                    password: logPassword
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    if (data.error){
                        toast({
                            variant:"destructive",
                            title: data.error
                        })
                    }
                    else{
                        localStorage.setItem("token", data.token)
                        toast({
                            title: data.msg,
                            variant:"success",
                        })
                        if (data.userInspector.role==="inspector"){
                            router.push("/inspector/statistics")
                        }
                        if (data.userInspector.role==="admin"){
                            router.push("/admin/statistics")
                        }
                        setLogEmail("")
                        setLogPassword("")
                        setLoading(false)
                        dispatch(setArray(data.userInspector))



                    }
                })

        }
    return (
        <>
            {/*<h1 className={`text-3xl mx-auto xl:min-w-[500px] lg:min-w-[500px] max-w-sm`}>Inspektor/Admin</h1>*/}
            <Card className="mx-auto xl:min-w-[500px] lg:min-w-[500px] max-w-sm shadow-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Inspektor/Admin</CardTitle>
                    {/*<CardDescription>Enter your email below to login to your account.</CardDescription>*/}
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input value={logEmail} onChange={e=>setLogEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input value={logPassword} onChange={e=>setLogPassword(e.target.value)} id="password" type="password" required/>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} className="w-full">
                        Kirish
                        {loading?<Loader2 className="ml-2 h-4 w-4 animate-spin" />:""}
                    </Button>
                </CardFooter>
                <CardContent>

                </CardContent>
            </Card>
        </>
    );

}

export default Page;