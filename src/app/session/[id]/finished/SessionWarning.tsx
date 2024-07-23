'use client'
import Congratulations from "@/components/Congratulations"
import {Tab, Tabs} from "@nextui-org/tabs";
import {CardBody} from "@nextui-org/react";
import {Card} from "@nextui-org/card";
import {useMarkdownProcessor} from "@/hooks/markdown";

export default function SessionWarning({summaryInfo, transcript}: any ) {
    const summaryTab = <p>
        {
            summaryInfo.description && summaryInfo.description.split('\n').map((line, index) => (
                <div key={index} className={line.startsWith('**') ? 'font-bold' : ''}>
                    {line}
                </div>
            ))
        }
    </p>

    return (
        <div className="w-full ">
            <Congratulations />
            <div className=" ">
                <div className="">
                    <main className="">

                        <div>
                            <Card
                                className={'bg-darkViolet min-h-96'}
                            >
                                <CardBody>
                                    <Tabs>
                                        <Tab
                                            title={'Session Summary'}
                                        >
                                            {
                                                summaryTab
                                            }
                                        </Tab>
                                        <Tab
                                            title={'Transcript'}
                                        >
                                            <MessageComponent data={transcript} summaryInfo={summaryInfo}/>
                                        </Tab>

                                    </Tabs>
                                </CardBody>
                            </Card>


                        </div>
                    </main>
                </div>
            </div>
            <div className="flex items-center   justify-around pt-12">
                <div className=" flex justify-center ">
                    <a className="btn-feedback w-auto" href={'/home/csm?status=completed'}>Go Back</a>
                </div>
            </div>
        </div>
    )
}



const MessageComponent = ({ data , summaryInfo}) => {
    return (
        <div className="m-4 flex gap-5 justify-center	">
            <div className={'w-5/6'}>
                {data.map((message, index) => (
                    <div className={`flex ${message.is_user ? 'justify-start': 'justify-end'} mb-4`} key={
                        index + "chat-"
                    }>
                        <div key={index} className=" max-h-full	 rounded-xl shadow-md  gap-4  w-5/6	">
                            <div className="p-4 bg-white">
                                <div className="flex items-center">
                                    <p className="text-sm font-semibold text-gray-600">{message.name || summaryInfo.session.customer.name}</p>
                                </div>
                                <div className="mt-2">
                                    <p className="text-gray-800">{message.message}</p>
                                </div>
                                <div className="mt-4">
                                    <p className="text-xs text-gray-500">
                                        {new Date(message.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={'overflow-auto max-h-full'}>
                {data.filter(_data => _data.response_feedback !== null).map((message, index) => (
                    <div key={index} className=" rounded-xl shadow-md overflow-hidden mb-4 ">
                        <div className="p-4 bg-white">
                            {message.response_feedback !== null && (
                                <p className="text-sm text-gray-600">
                                    Feedback: <Message message={message.response_feedback.rag_response}/>
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Message = ({ message }) => {
    const content = useMarkdownProcessor(message);
    return <>{content}</>
}
