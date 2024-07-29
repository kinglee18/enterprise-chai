import Image from 'next/image'
import React from 'react'

interface HeaderProps {
    title: string
    subtitle?: string
}
export default function Header({title, subtitle}: HeaderProps) {
    return (
        <nav className='w-full  pt-2 pb-2 flex justify-between items-center border-b border-grayDark mb-3 gap-2'>
            <div className='w-11/12'>
                <h2>{title}</h2>
                {/* <p className={'font-montserrat text-grayLight2 text-md'}>{subtitle}</p> */}
                {subtitle && <p className={'font-montserrat text-grayLight2 text-md'}>{subtitle}</p>}
            </div>
            <div className='w-1/4 flex justify-end items-center gap-4'>
                <div className='relative'>
                    <Image
                        src={'/search.svg'}
                        alt='user photo'
                        width={16}
                        height={16}
                        className='absolute left-3 top-1/2 transform -translate-y-1/2'
                    />
                    <input type="search" placeholder='Type here...' className='hidden search-input pl-8 pr-4 border border-gray-500'/>
                </div>

                <div className='flex gap-4 gap-y-0 hidden'>
                    <div className='flex-col justify-end items-end h-16 pt-2'>
                        <Image
                            src={'/user-01.svg'}
                            alt='user photo'
                            width={24}
                            height={24}
                        />
                        <small className='text-xsm'>Profile</small>
                    </div>
                    <div className='flex-col justify-end items-end h-16 pt-2'>
                        <Image
                            src={'/bell.svg'}
                            alt='alert photo'
                            width={24}
                            height={24}
                        />
                        <small className='text-xsm text-gray-600'>Alerts</small>
                    </div>
                </div>
            </div>
        </nav>
    )
}
