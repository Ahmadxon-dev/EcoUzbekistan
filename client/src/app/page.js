import Image from "next/image";

const stats = [
  { name: "Viloyat", value: "12 ta" },
  { name: "Interfeys ko'rinishi", value: "Qulay" },
  { name: " Xizmat", value: "24/7" },
];

export default function Home() {
  return (
    <div className="overflow-y-hidden pt-20 text-white w-full bg-[url('./bg.jpeg')] bg-no-repeat bg-cover bg-center h-screen  font-[family-name:var(--font-geist-sans)]">

      <div className="mx-auto max-w-7xl  px-10 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight pt-10 sm:text-6xl">
            Chiqindilarsiz Toshkent
          </h2>
          <p className="mt-6 text-lg leading-8 ">
            Toshkent shahri bo’ylab “chiqindi quti”lari o’rnatilishi kerak
            bo’lgan ko’chalarni aniqlash va ular haqida hukumat yoki atrof-muhit
            tozaligi bilan shug’ullanuvchi tashkilotlarga ma’lumot berish
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse">
                  <dt className="text-base leading-7">
                    {stat.name}
                  </dt>
                  <dd className="text-2xl font-bold leading-9 tracking-tight ">
                    {stat.value}
                  </dd>
                </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
