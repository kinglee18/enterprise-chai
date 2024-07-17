'use server'
import {createCustomer} from "@/services/customers";
import {z} from "zod";
import {redirect} from "next/navigation";


export const saveCustomer = async (
    prevState: string | undefined,
    formData: FormData
) => {
    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        interested_products: z.string(),
        point_of_contact: z.string()
    });

    const parse = schema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        interested_products: formData.get("interested_products"),
        point_of_contact: formData.get("point_of_contact")
    });


    if (!parse.success) {
        return { message: parse.error.errors[0].message };
    }
    try {
        const data = {
            ...parse.data,
            interested_products: parse.data.interested_products.split(',')
        };
        await createCustomer(data)

    } catch (e) {
        console.log(e)
        const msg = e?.response?.data?.email?.join('')
        return { message: msg || 'failed to create the customer'}
    }
    redirect('/home/customers')
}
