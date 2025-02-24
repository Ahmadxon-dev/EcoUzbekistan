import React, {useEffect, useState} from 'react';
import {Loader2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

function InspectorListPage(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const {toast} = useToast()
    const [currentEmail, setCurrentEmail] = useState("")
    const [currentName, setCurrentName] = useState("")
    //variables for new inspector
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newName, setNewName] = useState("")
    const [newRegion, setNewRegion] = useState("")
    const [newLoading, setNewLoading] = useState(false)
    // const router = useRouter()
    // const userData = useSelector(state=>state.user.userData)

    useEffect(()=>{
        async function fetchPosts() {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER}/admin/inspectorslist`, {
                    // cache: 'no-store', // Optionally control caching
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const fetchedData = await res.json();
                setData(fetchedData);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts()
    }, [])
    const deleteInspector = async (id)=>{
        await fetch(`${import.meta.env.VITE_SERVER}/admin/inspectorslist/delete/${id}`, {
            method:"post",
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
                        title:data.msg,
                        variant: "success",
                    })
                    setData(data.filteredNewData)
                }
            })
    }

    const handleEditButton = async (id)=>{
        await fetch(`${import.meta.env.VITE_SERVER}/admin/inspectorslist/edit/${id}`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:currentEmail,
                name:currentName
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
                        title:data.msg,
                        variant: "success",
                    })
                    setData(data.filteredNewData)
                }
            })
    }
    const addInspector = async ()=>{
        if (!newName || !newEmail || !newPassword || !newRegion){
            toast({
                title:"Hamma maydonlar to'ldirilishi kerak",
                variant: "destructive",
            })
            return
        }
        setNewLoading(true)
        await fetch(`${import.meta.env.VITE_SERVER}/inspector/signup`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:newEmail,
                password:newPassword,
                name:newName,
                region:newRegion
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
                        title:data.msg,
                        variant: "success",
                    })
                    setNewLoading(false)
                    setData(data.filteredNewData)
                }
            })
    }
    if (!data) return <div className={`grid  items-center justify-center m-auto`}>
        <h1>Ma'lumot yo'q</h1>
    </div>

    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin" />
    </div>
    // email password name region
    return (
        <>
            {
                data.length>0
                    ?
                    <div className={`relative flex justify-center items-center flex-col lg:flex-row`}>
                        <Table className={`w-2/6 mx-auto space-y-6 p-6 border-gray-200 border-2 `}>
                            <TableHeader >
                                <TableRow >
                                    <TableHead className="w-[100px]">Viloyat</TableHead>
                                    <TableHead>F.I.SH</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className={`text-center`}>Amallar</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody >

                                {
                                    data.map(inspector=>{
                                        return <TableRow className={`cursor-pointer`} key={inspector._id} >
                                            <TableCell className="font-medium">{inspector.region}</TableCell>
                                            <TableCell>{inspector.name?inspector.name:"test"}</TableCell>
                                            <TableCell>{inspector.email}</TableCell>
                                            <TableCell className={`flex justify-between gap-3`}>
                                                <Button onClick={()=>deleteInspector(inspector._id)} variant={"destructive"}>O'chirish</Button>
                                                {/*tahrirlash button */}
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button onClick={()=>{
                                                            setCurrentEmail(inspector.email)
                                                            setCurrentName(inspector.name)
                                                        }}>Tahrirlash</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Inspektor malumotlarini tahrirlash</DialogTitle>
                                                            {/*<DialogDescription>*/}
                                                            {/*    Make changes to your profile here. Click save when you're done.*/}
                                                            {/*</DialogDescription>*/}
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="username" className="text-right">
                                                                    F.I.SH
                                                                </Label>
                                                                <Input
                                                                    id="username"
                                                                    defaultValue={currentName}
                                                                    className="col-span-3"
                                                                    value={currentName}
                                                                    onChange={e=>setCurrentName(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-4 items-center gap-4">
                                                                <Label htmlFor="email" className="text-right">
                                                                    Email
                                                                </Label>
                                                                <Input
                                                                    id="email"
                                                                    defaultValue={currentEmail}
                                                                    className="col-span-3"
                                                                    value={currentEmail}
                                                                    onChange={e=>setCurrentEmail(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button type="submit" onClick={()=>handleEditButton(inspector._id)}>Saqlash</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    })

                                }
                            </TableBody>


                        </Table>
                        {/*<Button className={`lg:absolute top-3 right-3 z-50  lg:w-auto w-full`}>Inspektor qo'shish</Button>*/}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className={`lg:absolute top-3 right-3 z-50  lg:w-auto w-full`}>Inspektor qo'shish</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Yangi inspektor yaratish</DialogTitle>
                                    {/*<DialogDescription>*/}
                                    {/*    Make changes to your profile here. Click save when you're done.*/}
                                    {/*</DialogDescription>*/}
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Ism
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newName}
                                            onChange={e=>setNewName(e.target.value)}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            className="col-span-3"
                                            value={newEmail}
                                            onChange={e=>setNewEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                            Parol
                                        </Label>
                                        <Input
                                            id="password"
                                            className="col-span-3"
                                            value={newPassword}
                                            onChange={e=>setNewPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center  gap-4">
                                        <Label htmlFor="region" className="text-right">
                                            Viloyat
                                        </Label>
                                        <div className={`col-span-3`}>
                                            <Select className={`z-50 w-full `} onValueChange={value => setNewRegion(value)} id="region" required>

                                                <SelectTrigger className="w-full">
                                                    <SelectValue className={`   w-full   `} placeholder="Viloyatni tanlang"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
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
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={()=>addInspector()}>
                                            Qo'shish
                                            {newLoading?<Loader2 className="ml-2 h-4 w-4 animate-spin" />:""}
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    :
                    <h1>Inspektor Yo'q</h1>
            }
        </>
    );
}

export default InspectorListPage;