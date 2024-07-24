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
            <div className={''}>
                {data.map((message, index) => (
                    <>
                        <div className={`flex ${message.is_user ? 'justify-start': 'justify-end'} mb-4 w-3/6 rounded `} key={
                            index + "chat-"
                        }>
                            <div key={index} className=" max-h-full	   gap-4 	">
                                <div className="p-4 bg-white mr-4 rounded-xl shadow-md">
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
    return <div className={'w-3/6 p-4 bg-white rounded-xl shadow-md '}>
        <p className={'text-sm font-semibold text-gray-600 mb-2'}>Feedback:</p>{content}
        <p className="text-xs text-gray-500 capitalize">
            {message.generated_from}
        </p>
    </div>
}
