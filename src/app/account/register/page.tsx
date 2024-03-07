'use client'
import Image from 'next/image'
import React from 'react'
import {createUser} from "@/actions/account";
import { useFormState, useFormStatus } from "react-dom";



const initialState = {
  message: "",
};

export default function Register() {
  const [state, formAction] = useFormState(createUser, initialState);

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
          <h3 className='mb-10'>Already have an account? <span className={'text-primarySmall'}>Log-in</span></h3>
          <div>
            <label className="block">
              <span className="text-gray-700">email</span>
                <input
                  type="text"
                  className="form-input mt-1 block w-full"
                  placeholder="enter your email"
                  name={'email'}
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
                placeholder="enter your password"
                name={'password'}
              />
          </label>
        </div>
        <div className="flex gap-2 pt-4 pb-4 mb-8">
          <input type="checkbox" className='checkbox-login'/> I agree to EnterpriseCHAI’s Terms & Conditions and Privacy Policy
        </div>
          <p className={'text-warning'}>{state.message}</p>
          <SubmitButton/>
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn-primary w-full" aria-disabled={pending}>
      Create an account
    </button>
  );
}
