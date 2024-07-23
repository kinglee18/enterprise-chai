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
        description: z.string(),
        customer: z.string(),
    });

    const parse = schema.safeParse({
        journey_phase: formData.get("journey_phase"),
        product: formData.get("product"),
        description: formData.get("description"),
        customer: formData.get("customer")
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
