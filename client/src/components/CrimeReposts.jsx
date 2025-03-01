import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import {motion} from "framer-motion";

export default function CrimeReports() {
    const [allReports, setAllReports] = useState([]); // Store full dataset
    const [reports, setReports] = useState([]); // Filtered dataset
    const [loading, setLoading] = useState(true);
    const [crimeTypes, setCrimeTypes] = useState([]);
    const [selectedCrimeType, setSelectedCrimeType] = useState("Barcha");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/getstatistics`);
        const data = await response.json();

        setAllReports(data.posts.slice(0,6)); // Store the full dataset
        setReports(data.posts.slice(0,6)); // Initially show everything
        setCrimeTypes(["Barcha", ...new Set(data.posts.slice(0,6).map((report) => report.crimeType))]);
        setLoading(false);
    };

    // Filter reports without modifying the full dataset
    useEffect(() => {
        if (selectedCrimeType === "Barcha") {
            setReports(allReports); // Reset to full dataset
        } else {
            setReports(allReports.filter((report) => report.crimeType === selectedCrimeType));
        }
    }, [selectedCrimeType, allReports]); // Depend on full dataset to avoid overwriting it

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto p-4 mb-36 h-fit"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl font-bold mb-6">Arizalar</h1>
            <div className="mb-6">
                <Select onValueChange={(value) => setSelectedCrimeType(value)}>
                    <SelectTrigger className="w-[250px]">
                        <SelectValue placeholder="Qonunbuzarlik bo'yicha filterlash" />
                    </SelectTrigger>
                    <SelectContent>
                        {crimeTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
            >
                {reports.length === 0 ? (
                    <p className="text-center col-span-3 text-gray-500">Ma'lumot topilmadi</p>
                ) : (
                    reports.map((report) => (
                        <motion.div
                            key={report._id}
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">{report.fish}</CardTitle>
                                    <Badge>{report.crimeType}</Badge>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        src={report.image || "/placeholder.svg"}
                                        alt={`${report.fish}`}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover mb-4 rounded-md"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant={report.isDone ? "default" : "destructive"}>
                                            {report.isDone ? "Bajarilgan" : "Bajarilmagan"}
                                        </Badge>
                                        <Badge variant={report.isApproved ? "default" : "destructive"}>
                                            {report.isApproved ? "Tasdiqlangan" : "Tasdiqlanmagan"}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </motion.div>
    );
}




