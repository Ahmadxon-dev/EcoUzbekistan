import React from 'react';
import img from "../assets/bg.jpeg"

function ProjectsGrid(props) {
    const projects = [
        {
            title: "Soil Quality Study",
            image: img,
            alt: "Hands holding soil for quality study",
        },
        {
            title: "Causes of Global Warming",
            image: img,
            alt: "Hands holding a globe of the Earth",
        },
        {
            title: "Exploitation of Natural Resources",
            image: img,
            alt: "Person holding wooden logs",
        },
        {
            title: "Overpopulation Concerns",
            image: img,
            alt: "Crowded city street with many people walking",
        },
        {
            title: "Effects of Intensive Farming",
            image: img,
            alt: "Tractor carrying hay bale on farmland",
        },
        {
            title: "Renewable Energy for Homes",
            image: img,
            alt: "Person installing solar panels",
        },
    ]
    return (
        <section className="py-16 px-4 md:px-6 h-fit my-auto ">
            <div className="max-w-6xl mx-auto ">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Bizning loyihalar</h2>
                    <p className="text-lg text-muted-foreground">
                        We've a diverse portfolio, ranging from industry to education & environment
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg transition-all hover:shadow-lg">
                            <div className="aspect-[4/3] relative">
                                <img
                                    src={project.image || "/placeholder.svg"}
                                    alt={project.alt}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4 bg-white dark:bg-gray-950">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectsGrid;