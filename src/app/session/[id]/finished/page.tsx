'use client'
import React, { useEffect, useState } from 'react';
import {getSummary} from "@/services/summary";
import SessionWarning from "@/app/session/[id]/finished/SessionWarning";
import {extractToken} from "@/app/home/materials/MaterialsForm";
import Loading from "@/app/session/[id]/finished/loading";

export default function Finished({params}) {
    const token = extractToken(document.cookie)
    const [summaryInfo, setSummaryInfo] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            const data = await getSummary(params.id, token);
            setSummaryInfo(data[0]);
        };

        fetchSummary();
    }, [params.id]);

    if (!summaryInfo) {
        return <Loading/>;
    }

    return (
        <main className="w-full px-9">
            <SessionWarning summaryInfo={summaryInfo}/>
        </main>
    );
}
