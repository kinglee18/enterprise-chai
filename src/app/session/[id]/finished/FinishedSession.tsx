'use client'
import Congratulations from "@/components/Congratulations"
import {Button} from "@nextui-org/react";
import {getTranscript} from "@/services/summary";
import {useState} from "react";
import Summary from "@/app/session/[id]/finished/Summary";
import Transcript from "@/app/session/[id]/finished/Transcript";

export default function FinishedSession({summaryInfo, transcript, id }: any ) {
    const [selectedTab, setSelectedTab] = useState(0);
    const summaryTab = <Summary summaryInfo={summaryInfo}/>;

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
                                    <Transcript data={transcript} summaryInfo={summaryInfo} id={id}/>
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
