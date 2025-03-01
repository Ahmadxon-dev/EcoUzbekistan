import {useSelector} from "react-redux";
import FeaturesImage from "../../assets/img_2.png"
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {Bar, BarChart, XAxis, YAxis} from "recharts"
import {useEffect, useState} from "react";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import React from 'react';
import NewsSection from "@/components/NewsSection.jsx";
import {Loader2} from "lucide-react";
import CrimeReports from "@/components/CrimeReposts.jsx";

function HomePage(props) {
    const userData = useSelector(state => state.user.userData)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch(`${import.meta.env.VITE_SERVER}/getstatistics/`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const fetchedData = await res.json();
            const regionStats = fetchedData.posts.reduce((acc, obj) => {
                acc[obj.region] = (acc[obj.region] || 0) + 1;
                return acc;
            }, {});
            const updatedChartData = Object.entries(regionStats).map(([region, applications]) => ({
                region: region.toLowerCase(),
                applications,
                fill: chartConfig[region.toLowerCase()] ? chartConfig[region.toLowerCase()].color : "var(--color-other)",
            }));
            setData(updatedChartData); // Set the processed data
            setLoading(false);
        }

        fetchPosts();
    }, []);
    const chartData = data || [];
    const chartConfig = {
        applications: {
            label: "Arizalar soni:",
        },
        "andijon": {
            label: "Andijon",
            color: "hsl(var(--chart-1))",
        },
        "buxoro": {
            label: "Buxoro",
            color: "hsl(var(--chart-2))",
        },
        "farg'ona": {
            label: "Farg'ona",
            color: "hsl(var(--chart-3))",
        },
        "jizzax": {
            label: "Jizzax",
            color: "hsl(var(--chart-4))",
        },
        "xorazm": {
            label: "Xorazm",
            color: "hsl(var(--chart-5))",
        },
        "namangan": {
            label: "Namangan",
            color: "hsl(var(--chart-6))",
        },
        "navoiy": {
            label: "Navoiy",
            color: "hsl(var(--chart-7))",
        },
        "qashqadaryo": {
            label: "Qashqadaryo",
            color: "hsl(var(--chart-8))",
        },
        "samarqand": {
            label: "Samarqand",
            color: "hsl(var(--chart-9))",
        },
        "sirdaryo": {
            label: "Sirdaryo",
            color: "hsl(var(--chart-10))",
        },
        "surxondaryo": {
            label: "Surxondaryo",
            color: "hsl(var(--chart-11))",
        },
        "toshkent": {
            label: "Toshkent",
            color: "hsl(var(--chart-12))",
        },
        "qoraqalpog'iston": {
            label: "Qoraqalpog'iston",
            color: "hsl(var(--chart-13))",
        },

    }
    return (
        <>

            <Carousel />
            <div className="container h-fit lg:h-screen sm:h-fit mx-auto flex items-center mt-20 px-4 py-8">
                <motion.div
                    className="grid lg:grid-cols-2 gap-8 items-center my-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Left side - Image */}
                    <motion.div
                        className="w-full my-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={FeaturesImage}
                            alt="Students learning in classroom"
                            className="object-cover rounded-lg"
                        />
                    </motion.div>

                    {/* Right side - Content */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold text-navy-900 mb-4">Loyihaning maqsadi</h1>

                        <div className="space-y-6 text-lg">
                            <p>
                                Loyihaning asosiy maqsadi — O‘zbekiston hududlaridagi atrof-muhitni ifloslanishidan
                                himoya qilish, muammolarni samarali va tez hal etish uchun aholi va inspektorlar
                                o'rtasida o'zaro aloqalarni kuchaytirishdir. Ushbu loyiha orqali har bir viloyat va
                                tumanlarda belgilangan inspektorlar, fuqarolar tomonidan ko'rsatilgan atrof-muhitni
                                buzish holatlarini o'rganib chiqib, ular bilan bog'lanishlari va zaruriy choralarni
                                ko'rishlari talab etiladi.
                            </p>
                            <p>
                                Aholi, muammo joylarini aniqlab, tegishli hududdagi inspektor bilan murojaat qilishi
                                mumkin. Inspektorlar esa, o'z navbatida, belgilangan vaqtda, ya'ni 10 kun ichida,
                                muammoni hal etib, bu haqda tasvir bilan tasdiqlovchi ma'lumotni joylashtirishi zarur.
                                Agar inspektor o'z vazifasini bajarib, muammoni hal qilmasa, ariza "bajarilmagan" deb
                                belgilanadi.
                            </p>
                            <p>
                                Bu loyiha, atrof-muhitni asrash va uni toza tutish uchun har bir insonning mas'uliyatini
                                oshirishni maqsad qiladi. Shu orqali, aholi va ekologik inspektorlar o'rtasidagi
                                hamkorlikni kuchaytirib, atrof-muhitdagi buzilishlarni tez va samarali bartaraf etish
                                imkoniyatlarini yaratadi.

                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <CrimeReports />

            <motion.div
                className="h-[75vh] w-full flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
            >
                {loading ? (
                    <motion.div
                        className="grid items-center justify-center m-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                    >
                        <Loader2 className="mr-2 h-20 w-20 animate-spin"/>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="w-[80vw] h-fit mx-auto mt-20">
                            <CardHeader className="w-full mx-auto text-center">
                                <CardTitle>Viloyatlar kesimida qayd etilgan ekoligik muammolar ko'rsatgichi</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="w-[100%] h-[300px] mx-auto">
                                    <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: 50 }}>
                                        <YAxis
                                            dataKey="region"
                                            type="category"
                                            tickLine={false}
                                            tickMargin={5}
                                            axisLine={false}
                                            tickFormatter={(value) => chartConfig[value]?.label}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <XAxis dataKey="applications" type="number" hide />
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <Bar dataKey="applications" layout="vertical" radius={5} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>

            <NewsSection />
            <Footer />
        </>
    );
}

export default HomePage;