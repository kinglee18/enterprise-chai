'use client'
import Image from 'next/image'
import React from 'react'
import {createUser} from "@/actions/account";
import { useFormState, useFormStatus } from "react-dom";
import {Button} from "@nextui-org/react";

const initialState = {
    message: "",
};

export default function Register() {
    const [state, formAction] = useFormState(createUser, initialState);
    const [checked, setChecked] = React.useState(true);
    return (
        <form className='bg-white rounded-lg h-screen flex xl:pl-36 lg:pl-24' action={formAction}>

            <div className='w-7/12 flex-col p-10'>
                <div className='w-9/12'>
                    <a className="flex text-2xl place-items-center text-primarySmall font-medium" href={'/'}>
                        <span>Enterprise</span>
                        <Image src="/cup_logo.svg" alt="Logo" width={43} height={45} className={'mx-1 mb-3'}/>
                        <span className={'font-medium text-primarySmall font-bold'}>CH</span>
                        <span className={'font-medium text-greenLogo font-bold'}>AI</span>
                    </a>
                    <p className='welcome-back'>Create an account</p>
                    <h3 className='mb-10'>Already have an account? <a
                        href={'/login'}
                        className={'text-primarySmall'}>Log-in</a></h3>
                    <section className={'flex gap-3 flex-col'}>
                        <div>
                            <label className="text-gray-700">name</label>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full"
                                placeholder="enter your name"
                                name={'username'}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700">email</label>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full"
                                placeholder="enter your email"
                                name={'email'}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700">password</label>
                            <input
                                type="password"
                                className="form-input mt-1 block w-full"
                                placeholder="enter your password"
                                name={'password'}
                            />
                        </div>
                    </section>
                    <div className="flex gap-2 pt-4 pb-4 mb-8">
                        <input
                            type="checkbox"
                            className='checkbox-login'
                            checked={checked}
                            onChange={(event) => {
                                setChecked(event.target.checked)
                            }}
                        /> I agree to EnterpriseCHAI’s Terms & Conditions and Privacy Policy
                    </div>
                    <p className={'text-warning'}>{state.message}</p>
                    <SubmitButton checked={checked}/>
                    <div className='w-full flex justify-between  items-center mt-20'>
                        <button className='btn-login'>
                            <Image src={'/google.png'} alt='linkedin logo' width={30} height={30}/>
            Sign in with Google
                        </button>
                        <button className='btn-login'>
                            <Image src={'/linkedin.png'} alt='linkedin logo' width={30} height={30}/>
            Sign in with Linkedin
                        </button>
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

function SubmitButton({
    checked,
}) {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            className={'w-full'}
            aria-disabled={pending}
            isLoading={pending}
            isDisabled={!checked}
            color="primary">
      Create an account
        </Button>
    );
}
