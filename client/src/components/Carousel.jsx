import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import heroImage1 from "../assets/bg.png"
import heroImage2 from "../assets/img_3.png"
import FeaturesImage from "../assets/img_4.png"
import {Link} from "react-router-dom";
function Carousel(props) {
    const images = [
        heroImage1,
        heroImage2,
        FeaturesImage
    ]
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])
    const goToSlide = (index) => {
        setCurrentSlide(index)
    }
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {images.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={src || "/placeholder.svg"}
                        alt={`Carousel Image ${index + 1}`}
                        className="object-cover img-fill w-full h-full"
                    />
                </div>
            ))}

            <div className="absolute inset-x-0 top-56 flex items-center justify-center">
                <div className="max-w-3xl space-y-6 rounded-xl bg-black/50 p-8 text-center text-white">
                    <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Yosh ekologlar jamoat nazorati</h1>
                    {/*<p className="text-lg sm:text-xl md:text-2xl">Discover the power of innovation and creativity</p>*/}
                    <Link to="/add" >
                        <Button size="lg" className="bg-primary mt-6 text-primary-foreground hover:bg-primary/90">
                            Ariza qo'shish
                        </Button>
                    </Link>
                </div>
            </div>


            <div className="absolute bottom-4 left-0 right-0">
                <div className="flex justify-center space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Carousel;