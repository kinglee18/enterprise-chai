import {useMarkdownProcessor} from "@/hooks/markdown";

interface ChatBoxProps {
    message: {
        answer: string;
        timestamp: string;
        source_type: string;
    }
}
export default function ChatBox({message}: ChatBoxProps) {
    const content = useMarkdownProcessor(message.answer);
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
            {message.source_type && <div className="text-sm italic relative -bottom-1 text-right flex justify-end gap-4 text-grayLight2 font-normal text-xs pr-3">
                {message.source_type}
            </div>}
        </div>
    )
}
