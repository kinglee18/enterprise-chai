import Image from 'next/image'
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="px-24 min-h-screen">
        <Navbar/>
        <Image src={'/startup-logo.png'} width={190}  height={160} className={'my-10'}/>
        <section className={'flex flex-row'}>
            <article className="flex-1 flex flex-col text-center">
                <h3 className="text-2xl font-bold text-gray-800 w-4/6 self-center">Transform your Customer Success Managers into Superstars with </h3>
                <div className={'my-10'}>
                    <li className="text-gray-600 ">Facilitate High-Touch, Rapid Customer Onboarding</li>
                    <li className="text-gray-600 ">Shrink Time To Value from 12 to 3 Months.</li>
                    <li className="text-gray-600 ">Rapid Upskilling for Customer Success Managers </li>
                </div>
                <p className="text-gray-600 ">Revolutionize your approach with EnterpriseCHAI </p>
                <button className="bg-primary text-white px-4 py-2">
                    Get Started for Free
                </button>
            </article>
            <Image src={'/session.png'} width={800}  height={600} className="flex-1"/>
        </section>
    </main>
  )
}
