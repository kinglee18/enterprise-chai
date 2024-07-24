'use client'
import Congratulations from "@/components/Congratulations"
import {Tab, Tabs} from "@nextui-org/tabs";
import {CardBody} from "@nextui-org/react";
import {Card} from "@nextui-org/card";
import {useMarkdownProcessor} from "@/hooks/markdown";

export default function SessionWarning({summaryInfo, transcript}: any ) {
    const summaryTab = <div>
        {
            summaryInfo?.summary_details?.conversation_summary &&
          <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Executive summary</h3>
              <div dangerouslySetInnerHTML={{__html: summaryInfo?.summary_details?.conversation_summary.replace(/\n/g, '<br>')}} />
          </div>
        }
        {summaryInfo?.summary_details?.issues_discussed && (
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Issues Discussed</h3>
                <div dangerouslySetInnerHTML={{__html: summaryInfo.summary_details.issues_discussed.replace(/\n/g, '<br>')}} />
            </div>
        )}
        {summaryInfo?.summary_details?.action_items_and_challenges && (
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Action Items and Challenges</h3>
                <MarkDown content={summaryInfo.summary_details.action_items_and_challenges}/>
            </div>
        )}
        {summaryInfo?.summary_details?.critical_insights && (
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Critical Insights</h3>
                <p><strong>Renewal Status:</strong> {summaryInfo.summary_details.critical_insights.renewal_status}</p>
                <p><strong>Competitors Mentioned:</strong> {summaryInfo.summary_details.critical_insights.competitors_mentioned}</p>
                <p><strong>Customer Product Feedback:</strong> {summaryInfo.summary_details.critical_insights.customer_product_feedback}</p>
            </div>
        )}
        {summaryInfo?.summary_details?.overall_sentiment && (
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Overall Sentiment</h3>
                <p className="capitalize">{summaryInfo.summary_details.overall_sentiment}</p>
            </div>
        )}
        {summaryInfo?.summary_details?.session_score && (
            <div className="mb-4">
                <h3 className="text-md font-semibold mb-2">Session Score</h3>
                <p>{summaryInfo.summary_details.session_score}/10</p>
            </div>
        )}
    </div>

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
        <div className="m-4   justify-center	">
            <div className={''}>
                {data.map((message, index) => (
                    <>
                        <div className={`flex ${message.is_user ? 'justify-start': 'justify-end'} mb-4 w-3/6 rounded pr-3`} key={
                            index + "chat-"
                        }>
                            <div key={index} className=" max-h-full	   gap-4 	">
                                <div className="p-4 bg-white  rounded-xl shadow-md">
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
    return <div className={'w-3/6 p-4 bg-white rounded-xl shadow-md  '}>
        <p className={'text-sm font-semibold text-gray-600 mb-2'}>Feedback:</p>{content}
        <p className="text-xs text-gray-500 capitalize">
            {message.generated_from}
        </p>
    </div>
}

const MarkDown = ({ content }) => {
    const newContent = useMarkdownProcessor(content);
    return <div className={''}>
        {newContent}
    </div>
}
