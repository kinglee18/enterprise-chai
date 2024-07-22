import Image from "next/image";
import iconTime from "../../public/Icon.svg"
import iconGift from "../../public/Icon2.svg"


export default function Tags() {
    return (
        <div className="h-10 bg-white flex justify-start align-center items-center  mb-4  mx-auto gap-4 ">
            <Image
                src={iconGift}
                alt="gift icon"
                width={20}
                height={20}
            />
            <span className="text-gray-500 font-light">
      Free trial
            </span>
            <Image
                src={iconTime}
                alt="time icon"
                width={20}
                height={20}
            />
            <span className="text-gray-500 font-light">
        27 min
            </span>
        </div>
    )
}
