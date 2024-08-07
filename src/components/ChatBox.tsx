import {useMarkdownProcessor} from "@/hooks/markdown";
import { HiOutlineHandThumbDown } from "react-icons/hi2";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import {sendFeedback} from "@/services/feedback";
import {useState} from "react";

interface ChatBoxProps {
    message: {
        answer: string;
        timestamp: string;
        source_type: string;
        message_id: string;
    }
}
export default function ChatBox({message}: ChatBoxProps) {
    const content = useMarkdownProcessor(message.answer);
    const [isLiked, setIsLiked] = useState();

    const onLike = async () => {
        try {
            setIsLiked(true)
            const response = await sendFeedback(message.message_id, true);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    const onDislike = async () => {
        try {
            setIsLiked(false)
            const response = await sendFeedback(message.message_id, false);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className={""}>
            <div className="w-full p-4 bg-white rounded-2xl shadow-md mb-3">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="ml-3">
                        <div className="text-sm text-grayCustom font-extralight text-xs">{message.timestamp}</div>
                        <li className="flex flex-col flex-1 min-w-0 gap-1 ">
                            <div className="  min-w-0 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                                {content}
                            </div>
                        </li>
                    </div>
                </div>
            </div>

            <div className="relative -bottom-1 text-right flex justify-end  pr-3 gap-3">
                <div className={'flex gap-3'}>
                    <HiOutlineHandThumbUp
                        className={`${isLiked ? 'text-green-500' : 'text-grayLight2'}`}
                        onClick={() => onLike(message.message_id)}
                    />
                    <HiOutlineHandThumbDown
                        className={`${isLiked === false ? 'text-red-500' : 'text-grayLight2' }`}
                        onClick={() => onDislike(message.message_id)}
                    />
                </div>
                <span className={'text-grayLight2 font-normal  text-sm italic '}>{message.source_type}</span>

            </div>


        </div>
    )
}
