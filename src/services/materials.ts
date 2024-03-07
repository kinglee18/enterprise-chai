'use server'
import {cookies} from "next/headers";
const material =  {
    "id": 1,
    "file": "/documents/elements.svg",
    "uploaded_at": "2024-03-05T15:58:45.350226Z",
    "company": "name of the file",
    "product": "j",
    "tags": "dddd"
}
export const getMaterials = async () => {
    try {
        const token = cookies().get('token').value
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + '/documents', {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
            }
        })

        const json = await response.json()
        if (json.error) {
            return { materials: [] }
        }
        return { materials: json }
    } catch (e) {
        console.log(e)
        return { materials: [] }
    }
}
