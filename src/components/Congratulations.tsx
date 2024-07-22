import Image from "next/image";

export default function Congratulations() {
    return (
        <div>
            <div className="flex justify-center items-center font-bold gap-1 pt-9">
                <span className="text-2xl text-primarySmall">Congratulations</span>
                <Image src={'/celebration.png'} alt="celebration" width={48} height={52}/>
                <span className="text-2xl text-primarySmall">on a successful conversation!</span>
            </div>
            <div className="flex justify-center">
                <p className="text-base text-primarySmall pt-3 mb-3">Your call summary can also be found at CSM Companion Tab</p>
            </div>
        </div>
    )
}
