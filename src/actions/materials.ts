'use server'
import {cookies} from "next/headers";
import axios from "axios";
import {z} from "zod";
import {redirect} from "next/navigation";

export const  saveFile = async (
    prevState: string | undefined,
    formData: FormData
) => {
    const MAX_FILE_SIZE = 5000 * 1024 * 1024;
    const ACCEPTED_IMAGE_TYPES = [
        "pdf",
    ];

    const schema = z.object({
        file: z
            .any()
    });

    const parse = schema.safeParse({
        file: formData.get("file"),
        company: formData.get("company"),
        tags: formData.get("tags"),
        product: formData.get("product"),
    });

    if (!parse.success) {
        return { message: parse.error.errors[0].message };
    }
    try {
        const token = cookies().get('token').value
        const data = parse.data;

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
    redirect('/home/materials')

}
