import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NewsImage1 from "../assets/new1.png"
import NewsImage2 from "../assets/new2.jpg"
import NewsImage3 from "../assets/new3.jpg"
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
        <div className="container mx-auto px-4 py-8 lg:h-screen ">
            <h2 className="text-2xl font-bold mb-6">Yangiliklar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((item) => (
                    <NewsCardWithImage key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

function NewsCardWithImage({ title, description, date, image }) {
    return (
        <Card className="overflow-hidden pt-0">
            <img src={image || "/placeholder.svg"} alt={title} fetchPriority={"high"} className={`w-full h-full object-cover`}  />
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{date}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="">{description}</p>
            </CardContent>
        </Card>
    )
}



export default NewsSection;