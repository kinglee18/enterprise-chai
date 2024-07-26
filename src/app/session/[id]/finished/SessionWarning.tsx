'use client'
import Congratulations from "@/components/Congratulations"
import {Button} from "@nextui-org/react";
import {useMarkdownProcessor} from "@/hooks/markdown";
import {getTranscript} from "@/services/summary";
import {useState} from "react";

export default function SessionWarning({summaryInfo, transcript, id }: any ) {
    const [selectedTab, setSelectedTab] = useState(0);
    const summaryTab = <div className={'m-4 min-h-96 h-[550px] overflow-y-auto flex flex-col gap-10'}>
        {
            summaryInfo?.summary_details?.conversation_summary &&
          <div className=" flex gap-40">
              <div className={'w-3/6'}>
                  <h3 className="font-medium  text-xl mb-2">Executive summary</h3>
                  <div className={'text-sm'} dangerouslySetInnerHTML={{__html: summaryInfo?.summary_details?.conversation_summary.replace(/\n/g, '<br>')}} />
              </div>
              <div className={'flex gap-6  w-3/6 justify-end px-10'}>
                  <div className={'absolute flex gap-5'}>

                      {summaryInfo?.summary_details?.session_score && (<div className={'  '}>
                          <div class="w-28 h-28 rounded-full bg-lightBlue flex items-center justify-center">
                              <span class=" text-base	 font-bold">{summaryInfo.summary_details.session_score}</span>
                          </div>
                          <div>
                              <h3 className="text-md  mb-2 font-sm w-full">Session Score</h3>
                          </div>
                      </div>)}
                      {summaryInfo?.summary_details?.overall_sentiment && (<div className={'flex flex-col items-center '}>
                          <div class="w-28 h-28 rounded-full bg-lightGreen flex items-center justify-center">
                              <span class=" text-base capitalize	 font-bold">{summaryInfo?.summary_details?.overall_sentiment}</span>
                          </div>
                          <div>
                              <h3 className="text-md  mb-2 font-sm w-full"> Overall Sentiment</h3>
                          </div>
                      </div>)}
                  </div>

              </div>
          </div>
        }
        {summaryInfo?.summary_details?.action_items_and_challenges && (
            <div className="">
                <h3 className="font-medium  text-xl mb-2">Action Items and Challenges</h3>
                <MarkDown content={summaryInfo.summary_details.action_items_and_challenges}/>
            </div>
        )}
        {summaryInfo?.summary_details?.critical_insights && (
            <div className="">
                <h3 className="font-medium  text-xl mb-2">Critical Insights</h3>
                <p><span className={''}>Renewal Status:</span> {summaryInfo.summary_details.critical_insights.renewal_status}</p>
                <p><span className={''}>Competitors Mentioned:</span> {summaryInfo.summary_details.critical_insights.competitors_mentioned}</p>
                <p><span className={''}>Customer Product Feedback:</span> {summaryInfo.summary_details.critical_insights.customer_product_feedback}</p>
            </div>
        )}



        {summaryInfo?.summary_details?.issues_discussed && (
            <div className="">
                <h3 className="font-medium  text-xl mb-2">Issues Discussed</h3>
                <div className={'ml-4'} dangerouslySetInnerHTML={{__html: summaryInfo.summary_details.issues_discussed.replace(/\n/g, '<br>')}} />
            </div>
        )}
    </div>

    const downloadBloab = async () => {
        const blob = await getTranscript(id, 'blob');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transcript.json';
        a.click();

    }

    return (
        <div className="w-full ">
            <Congratulations summaryInfo={summaryInfo}/>
            <div className={'flex  my-5 gap-3'}>
                <Button
                    className={`${selectedTab === 0  ? 'bg-violetDark' : 'bg-violetLight'}  w-36 h-12 rounded`}
                    onClick={()  => setSelectedTab(0)}>
                    Summary
                </Button>
                <Button
                    className={`${selectedTab === 1? 'bg-violetDark' : 'bg-violetLight'} w-36 h-12 rounded`}
                    onClick={()  => setSelectedTab(1)}>
                    Transcript
                </Button>
            </div>

            <div >
                <div>
                    <main>

                        <div
                            className={'bg-whiteGray my-2 p-3'}

                        >

                            {   selectedTab === 0 && summaryTab}


                            {
                                selectedTab === 1 && (<>
                                    <MessageComponent data={transcript} summaryInfo={summaryInfo} id={id}/>
                                    <div className={'flex justify-end'}>
                                        <Button
                                            className={'btn-feedback bg-violetDark'}
                                            onClick={downloadBloab}
                                        >Download </Button>
                                    </div>

                                </>
                                )
                            }

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


const MessageComponent = ({ data , summaryInfo }) => {

    return (
        <div className="m-4 min-h-96 h-[550px] overflow-y-auto	pr-2">
            <div className={
                ' '
            }>
                {data.map((message, index) => (
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
