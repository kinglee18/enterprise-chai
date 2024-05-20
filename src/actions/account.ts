"use server";

import { z } from "zod";
import {signInApp} from "../../auth";
import axiosInterceptorInstance from "../../axiosInterceptorInstance";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function createUser(
    prevState: {
        message: string;
    },
    formData: FormData,
) {
    const schema = z.object({
        email: z.string().email({ message: "Invalid email"}),
        password: z.string().min(8, { message: "Password must be at least 8 characters long"})
    });
    const parse = schema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (!parse.success) {
        return { message: parse.error.errors[0].message };
    }

    const data = parse.data;
    try {
        const response = await axiosInterceptorInstance.post( '/register', {
            email: data.email,
            username: data.email,
            password: data.password

        })
        if (response.status !== 201) {
            return { message: response.error }
        }
    } catch (e) {
        console.log(e)
        return { message: 'failed to create user try with another email'}
    }
    redirect("/login");
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {

    const response = await signInApp(formData.get("email") as string, formData.get("password") as string)
    if (response.token !== null) {
        cookies().set('token', response.token)
        redirect("/home/dashboard");
    }
    return { message: response.message };
}

