import axios from "axios";
import {extractToken} from "@/app/home/materials/MaterialsForm";


export const sendFeedback = async (id: string, feedback: boolean) => {
    const token = extractToken(document.cookie)
    try {
        const response = await axios.put( `${process.env.NEXT_PUBLIC_BACKEND}/response-feedback/${id}/`, {
            response_feedback: feedback
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        })
        const json = await response.data
        if (json.error) {
            return { feedback: [] }
        }
        return { feedback: json }
    } catch (e) {
        return { feedback: [] }
    }
}
