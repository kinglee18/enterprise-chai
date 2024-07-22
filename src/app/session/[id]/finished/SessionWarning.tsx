'use client'
import Congratulations from "@/components/Congratulations"
import {Tab, Tabs} from "@nextui-org/tabs";
import {CardBody} from "@nextui-org/react";
import {Card} from "@nextui-org/card";

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
                                            <MessageComponent data={transcript}/>
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



const MessageComponent = ({ data }) => {
    return (
        <div className="max-w-md mx-auto md:max-w-2xl m-4 ">
            {data.map((message, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                    <div className="p-8">
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-gray-600">{message.name}</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-gray-800">{message.message}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-500">
                                {new Date(message.created_at).toLocaleString()}
                            </p>
                        </div>
                        {message.response_feedback !== null && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                    Feedback: {message.response_feedback}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};
