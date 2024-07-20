'use client'
import Image from 'next/image'
import React from 'react'
import {authenticate} from "@/actions/account";
import {useFormState, useFormStatus} from "react-dom";
import {Button} from "@nextui-org/react";

const initialState : any = {
    message: "",
};

export default function Login() {
    const [state, formAction] = useFormState(authenticate, initialState);
    const [checked, setChecked] = React.useState(true);
    return (
        <form className='bg-white rounded-lg h-screen flex xl:pl-36 lg:pl-24' action={formAction}>

            <div className='w-7/12 flex-col p-10'>
                <div className='w-9/12'>
                    <a className="flex text-2xl place-items-center text-primarySmall font-medium" href={'https://www.enterprisechai.com'}>
                        <span>Enterprise</span>
                        <Image src="/cup_logo.svg" alt="Logo" width={43} height={45} className={'mx-1 mb-3'}/>
                        <span className={'font-medium text-primarySmall font-bold'}>CH</span>
                        <span className={'font-medium text-greenLogo font-bold'}>AI</span>
                    </a>
                    <p className='welcome-back'>Welcome back!</p>
                    <h3 className='mb-10'>Enter your credentials to access your account</h3>
                    <div>
                        <label className="block">
                            <span className="text-gray-700">email</span>
                            <input
                                type="email"
                                className="form-input mt-1 block w-full"
                                name={'email'}
                                placeholder="enter your email"
                                required
                            />
                        </label>
                    </div>
                    <br />
                    <div>
                        <label className="block">
                            <span className="text-gray-700">password</span>
                            <input
                                type="password"
                                className="form-input mt-1 block w-full"
                                name={'password'}
                                placeholder="enter your password"
                                required
                            />
                        </label>
                        <div  className='flex justify-end mt-1'>
                            <small className='hidden mr-0 text-primarySmall'>forgot password</small>
                        </div>
                    </div>

                    <div className="flex gap-2 my-4">
                        <input
                            type="checkbox"
                            className='checkbox-login'
                            checked={checked}
                            onChange={(event) => {
                                setChecked(event.target.checked)
                            }}
                        />
                        I agree to EnterpriseCHAI’s
                        <a href={'/account/register?section=terms'} className={'text-primarySmall'}>Terms and Conditions</a>
                    </div>
                    <p className={'text-warning'}>{state.message}</p>
                    <LoginButton
                        disabled={!checked}
                    />
                    <div className='flex justify-center gap-2 mt-10'>
                        <p>Don’t have an account?  </p>
                        <a  href={'/account/register'} className='text-primarySmall '>Sign Up</a>
                    </div>
                </div>
            </div>

            <div className="w-5/12 h-full relative">
                <div className="absolute inset-0">
                    <Image src={'/Frame Image.png'} alt='bubbles photo' layout='fill' objectFit='cover' />
                </div>
            </div>
        </form>
    )
}
const LoginButton = ({disabled}) => {
    const { pending } = useFormStatus();
    return <Button
        type="submit"
        className="btn-primary w-full rounded"
        isLoading={pending}
        isDisabled={pending || disabled}
        color="primary">
        Log in
    </Button>
}
