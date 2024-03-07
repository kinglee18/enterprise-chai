'use server'
import {cookies} from "next/headers";
import axios from "axios";

export const  saveFile = async (
    prevState: string | undefined,
    formData: FormData
) => {
    try {
        const token = cookies().get('token').value
        const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND + '/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        })
        console.log(response)
        if (response.data.error) {
            return { message: response.data.error }
        }
    } catch (e) {
        console.log(e)
        return { message: 'failed to upload file'}
    }
}
