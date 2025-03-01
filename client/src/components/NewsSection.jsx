import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NewsImage1 from "../assets/new1.png"
import NewsImage2 from "../assets/new2.jpg"
import NewsImage3 from "../assets/new3.jpg"
import {motion} from "framer-motion";

const newsItems = [
    {
        id: 1,
        title: "Koreya ekologiya korporatsiyasi bilan hamkorlikning istiqbolli loyihalari muhokama qilindi",
        description:
            "Koreya ekologik korporatsiyasi (K-eco) ijrochi direktori Kvang Myong Cha boshchiligidagi korporatsiya vakillari bilan uchrashuv bo‘lib o‘tdi. Uchrashuvda Ekologiya vaziri o‘rinbosari Iskandar Qutbiddinov, vazirlikning boshqarma va tizim tashkilotlari rahbarlari ishtirok etdi.",
        date: "05.11.2024",
        image: NewsImage1,
    },
    {
        id: 2,
        title: "Ekologiya vazirligi Tojikiston ekologiya qo‘mitasi bilan tajriba almashishdi",
        description:
            "Avval xabar berganimizdek, Tojikiston Respublikasi hukumati qoshidagi Atrof-muhitni himoya qilish qo‘mitasi mutaxassislaridan iborat delegatsiyasi O'zbekistonning atrof-muhitni muhofaza qilish sohasidagi tajribasini o‘rganish maqsadida Davlat ekologik ekspertiza markazida bo‘lishdi va taqdimot bilan tanishishdi.",
        date: "13.08.2024",
        image: NewsImage2,
    },
    {
        id: 3,
        title: "Ekologik loyihalarning situatsion xaritalarini tasdiqlashning elektron mexanizmi joriy etildi",
        description:
            "O‘zbekiston Respublikasi Prezidentining “Ekologiya, atrof-muhitni muhofaza qilish va iqlim o‘zgarishi vazirligi faoliyatini samarali tashkil etish chora-tadbirlari to‘g‘risida”gi qaroriga muvofiq atrof-muhitga ta’sirni baholash sohasini raqamlashtirish va shaffof tizim yaratilishi belgilangan.",
        date: "15.08.2024",
        image: NewsImage3,
    },
]
function NewsSection() {
    return (
        <motion.div
            className="container mx-auto px-4 py-8 lg:h-screen"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl font-bold mb-6">Yangiliklar</h1>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
            >
                {newsItems.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.5 }}
                    >
                        <NewsCardWithImage {...item} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

function NewsCardWithImage({ title, description, date, image }) {
    return (
        <motion.div
            className="overflow-hidden pt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
        >
            <Card className={`overflow-hidden pt-0`}>
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fetchPriority="high"
                    className="w-full h-[35vh] object-cover"
                />
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className={`line-clamp-5`}>{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}



export default NewsSection;