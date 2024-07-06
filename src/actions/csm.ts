'use server'
import {z} from "zod";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {patchConversation} from "@/services/csm";
import axiosInterceptorInstance from "../../axiosInterceptorInstance";

export const saveSession = async (
    prevState: string | undefined,
    formData: FormData
) => {
    const schema = z.object({
        journey_phase: z.string(),
        product: z.string(),
        point_of_contact: z.string(),
        description: z.string(),
        customer_email: z.string().email(),
    });

    const parse = schema.safeParse({
        journey_phase: formData.get("journey_phase"),
        product: formData.get("product"),
        point_of_contact: formData.get("point_of_contact"),
        description: formData.get("description"),
        customer_email: formData.get("customer_email")
    });

    if (!parse.success) {
        return { message: parse.error.errors[0].message };
    }
    let apiResponse;
    try {
        const token = cookies()?.get('token')?.value
        const data = parse.data;

        const response = await axiosInterceptorInstance.post( '/companion-session/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + token,
            }
        })
        if (response.data.error) {
            return { message: response.data.error }
        }
        apiResponse = response.data
    } catch (e) {
        return { message: 'failed to create the session'}
    }
    if(formData.has('launch')) {
        return { message: 'Session created successfully', session: apiResponse.id }
    } else {
        redirect('/home/csm')
    }
}

export const completeConversation = async (
    prevState: string | undefined,
    formData: FormData
) => {
    const token = 'Token ' + cookies()?.get('token')?.value
    const result = await patchConversation(formData?.get('conversationId') as string, {is_active: false}, token)
    if (result.error) {
        return { message: result.error }
    } else {
        redirect('/session/' + formData.get('conversationId') + '/finished')
    }
}
