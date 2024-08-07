import {useMarkdownProcessor} from "@/hooks/markdown";
import {utcHourToLocale} from "@/utils";
import {HiOutlineHandThumbDown, HiOutlineHandThumbUp} from "react-icons/hi2";

const orderByDate = (a, b) => {
    return new Date(a.created_at) - new Date(b.created_at);
}

export default function Transcript ({ data , summaryInfo }:
                        {
                            data: any [];
                            summaryInfo: any;
                        }
)  {

    return (
        <div className="m-4 min-h-96 h-[550px] overflow-y-auto	pr-2">
            <div className={
                ' '
            }>
                {data.sort(orderByDate).map((message, index) => (
                    <>
                        <div className={` mb-4 w-3/6 rounded pr-3`} key={
                            index + "chat-"
                        }>
                            <div key={index} className={` max-h-full	   gap-4  flex ${message.is_user ? 'justify-start' : 'justify-end'} 	`}>
                                <div className="p-4 bg-white  rounded-xl shadow-md w-5/6">
                                    <div className="flex items-center">
                                        <p className="text-sm font-semibold text-gray-600">{message.name || summaryInfo.session.customer.name}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-gray-800">{message.message}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500">
                                            {
                                                utcHourToLocale(message.created_at)
                                            }
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="  flex justify-end">
                            {message.response_feedback !== null && (
                                <>

                                    <Message message={message.response_feedback}/>
                                </>

                            )}
                        </div>
                    </>
                ))}
            </div>

        </div>
    );
};

const Message = ({ message }) => {
    const content = useMarkdownProcessor(message.rag_response);
    return <div className={'w-3/6 p-4 bg-white rounded-xl shadow-md  '}>
        <p className={'text-sm font-semibold text-gray-600 mb-2'}>Feedback:</p>{content}
        <div className={'flex gap-3 justify-end'}>

            {message.response_feedback !== null && <div className={'flex gap-3'}>
                <HiOutlineHandThumbUp
                    className={` ${message.response_feedback ? 'text-green-500' : 'text-gray-500'}`}
                />
                <HiOutlineHandThumbDown
                    className={` ${message.response_feedback === false ? 'text-red-500': 'text-gray-500' }`}
                />
            </div>
            }
            <span className="text-xs text-gray-500 capitalize">
                {message.generated_from}
            </span>
        </div>

    </div>
}
