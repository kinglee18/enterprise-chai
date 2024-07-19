'use client'
import axios from "axios";
import {extractToken} from "@/app/home/materials/MaterialsForm";

export const getSummary: Promise<any> = async (id: string) => {
    const token = extractToken(document.cookie)
    const response = await axios.get( process.env.NEXT_PUBLIC_BACKEND + '/summary?companion_session_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token
        }
    })

    const summary: any[] = await response.data
    //retry request if summary is an empty array
    if (summary.length === 0) {
        return await getSummary(id)
    }
    return summary
}

