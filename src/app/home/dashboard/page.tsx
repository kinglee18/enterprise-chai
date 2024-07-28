import Header from "@/components/Header";
import Infographics from "@/components/Infographics";
import Image from "next/image";


export default function Dashboard() {
    const getStartedInfo = [
        {
            title: 'Step1 - Upload Materials',
            description: 'Unleash your AI companion’s insights with personalized client & product materials.'
        },
        {
            title: 'Step2 - Create Sessions',
            description: 'Prepare your AI companion for client session by configuring client details & context'
        },
        {
            title: 'Step3 - Launch Sessions',
            description: 'Activate your AI companion for real-time guidance & feedback throughout your client call.'
        }]
    return (
        <div className="w-full px-9">
            <Header title={'Hello David'} subtitle={'“You will succeed if you have delighted customers. Don’t settle for satisfied!”'}/>
            <div className="flex flex-col md:flex-row gap-5 mt-8">
                <Infographics />
                <Image width={800} height={400} src="/chart.png" alt="dashboard" />
            </div>
            <div className="mt-20">
                <p className={'text-lg font-bold'}>How to get started</p>
                <div className="flex gap-40 mt-8">

                    {getStartedInfo.map((info, index) => (
                        <>
                            <div key={index} className="p-6 rounded-lg shadow-md bg-violet-50 shadow-custom px-4 h-32 text-center w-60">
                                <p className="text-base	 font-bold">{info.title}</p>
                                <p className=" text-xs	mt-2">{info.description}</p>
                            </div>
                            { index <=1 && <Image src="/arrows.png" width={70} height={28} alt="arrow" className={'h-5 self-center'} />}
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}
