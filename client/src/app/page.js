"use client"
import Image from "next/image";
import {useSelector} from "react-redux";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const stats = [
  { name: "Viloyat", value: "12 ta" },
  { name: "Interfeys ko'rinishi", value: "Qulay" },
  { name: " Xizmat", value: "24/7" },
];

export default function Home() {
  const userData = useSelector(state=>state.user.userData)

  return (
    <div className="overflow-y-hidden pt-20 text-white w-full bg-[url('./bg.jpeg')] bg-no-repeat bg-cover bg-center h-screen  font-[family-name:var(--font-geist-sans)]">

      <div className="mx-auto max-w-7xl  px-10 lg:px-8">
        <div className="mx-auto flex flex-col justify-center gap-7 lg:mx-0">
          <h2 className=" text-center max-w-6xl text-5xl font-bold  pt-10 sm:text-6xl">
            {/*class:tracking-tight */}
            Yosh ekologlar jamoat nazorati
          </h2>
          {userData.length===0 && <Link href={"/add"} className={`mx-auto text-white transition-colors hover:text-emerald-300`}><Button variant={"dark"} className={`w-48`}>Qo'shish</Button></Link>}
        </div>
        {/*<div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">*/}

        {/*  <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">*/}
        {/*    {stats.map((stat) => (*/}
        {/*        <div key={stat.name} className="flex flex-col-reverse">*/}
        {/*          <dt className="text-base leading-7">*/}
        {/*            {stat.name}*/}
        {/*          </dt>*/}
        {/*          <dd className="text-2xl font-bold leading-9 tracking-tight ">*/}
        {/*            {stat.value}*/}
        {/*          </dd>*/}
        {/*        </div>*/}
        {/*    ))}*/}
        {/*  </dl>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
