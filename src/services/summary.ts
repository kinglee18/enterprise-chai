'use client'
import axios from "axios";
import { extractToken } from "@/app/home/materials/MaterialsForm";

export const getSummary = async (id: string): Promise<any> => {
    const token = extractToken(document.cookie);
    const startTime = Date.now();
    const timeoutDuration = 5000; // 5 seconds timeout

    const fetchSummary = async (): Promise<any> => {
        const response = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND + '/summary?companion_session_id=' + id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + token
                }
            }
        );

        const summary: any[] = await response.data;

        if (summary.length === 0) {
            if (Date.now() - startTime >= timeoutDuration) {
                return "Timeout: Unable to retrieve summary after 5 seconds";
            }

            // Wait for 1 second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchSummary();
        }

        return summary;
    };

    return fetchSummary();
};
//{(baseUrl})/transcript?companion_session_id=id
export const getTranscript = async (id: string, responseType = 'json'): Promise<any> => {
    const token = extractToken(document.cookie);
    const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND + '/transcript?companion_session_id=' + id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            },
            responseType: responseType
        }
    )
    if(responseType === 'json') {
        return response.data
    } else if (responseType === 'blob') {
        return new Blob([response.data], { type: responseType, encoding: 'UTF-8' })

    }
}
