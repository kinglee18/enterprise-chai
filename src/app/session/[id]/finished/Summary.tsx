import {useMarkdownProcessor} from "@/hooks/markdown";

export default function Summary({
    summaryInfo
}) {
    return <div className={'m-4 min-h-96 h-[550px] overflow-y-auto flex flex-col gap-10'}>
        {
            summaryInfo?.summary_details?.conversation_summary &&
          <div className=" flex gap-40">
              <div className={'w-3/6'}>
                  <h3 className="font-medium  text-xl mb-2">Executive Summary</h3>
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
}

const MarkDown = ({ content }) => {
    const newContent = useMarkdownProcessor(content);
    return <div className={''}>
        {newContent}
    </div>
}
