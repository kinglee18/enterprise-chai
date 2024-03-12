import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

type LoginResponse = {
    token: string;
}
const login = async (email: string, password: string) => {
    console.log(process.env.NEXT_PUBLIC_BACKEND + '/login')
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + '/login', {
        method: 'POST',
        body: JSON.stringify(
            {email,password}
        ),
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-cache',
    })
    return response
}

export const  signInApp = async (email: string, password: string) => {
    const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string() })
        .safeParse({ email, password });
    if (!parsedCredentials.success) {
        return { message: 'Invalisd credentials' , token: null};
    }
    const credentials = parsedCredentials.data;
    let  response =  await login(credentials.email, credentials.password);
    if (response.status === 200) {
        const json: LoginResponse = await response.json()
        return { message: 'success', token: json.token };
    }
    return { message: 'Invalid credentials', token: null };

}
