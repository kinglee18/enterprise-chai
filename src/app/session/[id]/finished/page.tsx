'use client'
import React, { useEffect, useState } from 'react';
import {getSummary, getTranscript} from "@/services/summary";
import SessionWarning from "@/app/session/[id]/finished/SessionWarning";
import Loading from "@/app/session/[id]/finished/loading";

export default function Finished({params}) {
    const [summaryInfo, setSummaryInfo] = useState(null);
    const [transcript, setTranscript] = useState(null);
    const [lodingSummary, setLoadingSummary] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getSummary(params.id);
            const transcript = await  getTranscript(params.id);
            setLoadingSummary(false);
            setTranscript(transcript);
            setSummaryInfo(data[0]);
        };

        fetchSummary();
    }, [params.id]);


    if (lodingSummary && transcript === null) {
        return <Loading msg={<span>{'Generating call summary....'}</span>}/>;
    }

    if(!summaryInfo) {
        return <Loading msg={<span>
            The summary for the current session is being generated and may take several minutes.
            You will be notified once it is complete. In the meantime, you can view the completed sessions
            <a
                className={' underline ml-1'}
                href={'/home/csm?status=completed'}>here</a>
        </span>
        } />;
    }
    return (
        <main className="w-full px-9">
            <SessionWarning summaryInfo={summaryInfo} transcript={transcript} id={params.id}/>
        </main>
    );
}
