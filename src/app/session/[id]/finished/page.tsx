'use client'
import React, { useEffect, useState } from 'react';
import { getSummary } from "@/services/summary";
import SessionWarning from "@/app/session/[id]/finished/SessionWarning";
import Loading from "@/app/session/[id]/finished/loading";

export default function Finished({params}) {
    const [summaryInfo, setSummaryInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await getSummary(params.id);
                if (typeof data === 'string' && data.startsWith('Timeout:')) {
                    setError(data);
                } else {
                    setSummaryInfo(data[0]);
                }
            } catch (err) {
                setError('An error occurred while fetching the summary.');
            }
        };

        fetchSummary();
    }, [params.id]);

    if (error) {
        return (
            <main className="w-full px-9">
                <p>Error: {error}</p>
            </main>
        );
    }

    if (!summaryInfo) {
        return <Loading/>;
    }

    return (
        <main className="w-full px-9">
            <SessionWarning summaryInfo={summaryInfo}/>
        </main>
    );
}
