import { z } from 'zod';
import axiosInterceptorInstance from "./axiosInterceptorInstance";

type LoginResponse = {
    token: string;
}

const login = async (email: string, password: string) => {
    try {
        const response = await axiosInterceptorInstance.post( '/login', {email,password})
        return response
    } catch (e) {
        return { status: 500 }
    }
}

export const  signInApp = async (email: string, password: string) => {
    const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string() })
        .safeParse({ email, password });
    if (!parsedCredentials.success) {
        return { message: 'Invalisd credentials' , token: null};
    }
    const credentials = parsedCredentials.data;
    let response = await login(credentials.email, credentials.password);
    if (response.status === 200) {
        const json: LoginResponse = await response.data;
        return { message: 'success', token: json.token };
    }
    return { message: 'Invalid credentials', token: null };
}

export const signOutApp = async () => {
    try {
        const response = await axiosInterceptorInstance.post('/logout')
        return response
    }
    catch (e) {
        return { status: 500 }
    }
}
