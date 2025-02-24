import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Loader2} from "lucide-react";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
function EachStatisticsPage(props) {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loaderForImage, setLoaderForImage] = useState(true)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/getstatistics/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data.post)
                setLoading(false)
            })

    }, [])
    if (loading) return <div className={`grid  items-center justify-center m-auto`}>
        <Loader2 className="mr-2 h-20 w-20 animate-spin" />
    </div>
    return (
        <div className={`grid pt-20  items-center justify-center mx-auto`}>
            {loaderForImage &&  <div className={`grid  items-center justify-center m-auto`}>
                <Loader2 className="mr-2 h-20 w-20 animate-spin mx-auto" />
            </div>
            }
            <img src={data.image} fetchPriority={"high"} onLoad={()=>setLoaderForImage(false)} className={`mx-auto w-[800px] h-[390px] rounded-md`} alt={`rasm`} width={800} height={390}/>
            <Table className="border-collapse border border-slate-400 mt-5 rounded w-[800px]">
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
                    {/*<TableRow>*/}
                    {/*    <TableCell className="border border-slate-300 font-medium">Telefon raqami</TableCell>*/}
                    {/*    <TableCell className="border border-slate-300">{data.contact}</TableCell>*/}
                    {/*</TableRow> */}
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
            {
                data.areTenDaysPassed && <h1 className={`text-red-600 font-bold text-3xl`}>10 kun ichida to'g'irlanmagan</h1>
            }

            {!data.isDone && !data.areTenDaysPassed && <h1 className={`text-red-600 font-bold text-3xl`}>{10 - Math.floor((new Date() - new Date(data.createdAt) )/ (1000*60*60*24))} kun qoldi</h1>}
        </div>
    );
}

export default EachStatisticsPage;