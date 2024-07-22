'use client'
import React, { useEffect, useState } from 'react';
import {getSummary, getTranscript} from "@/services/summary";
import SessionWarning from "@/app/session/[id]/finished/SessionWarning";
import Loading from "@/app/session/[id]/finished/loading";

export default function Finished({params}) {
    const [summaryInfo, setSummaryInfo] = useState(null);
    const [transcript, setTranscript] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getSummary(params.id);
            const transcript = await  getTranscript(params.id);
            setTranscript(transcript);
            setSummaryInfo(data[0]);
        };

        fetchSummary();
    }, [params.id]);

    if (!summaryInfo) {
        return <Loading/>;
    }

    return (
        <main className="w-full px-9">
            <SessionWarning summaryInfo={summaryInfo} transcript={transcript} id={params.id}/>
        </main>
    );
}
