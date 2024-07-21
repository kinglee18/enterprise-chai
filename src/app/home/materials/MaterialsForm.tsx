'use client'
import React from "react";
import Image from "next/image";
import {Button} from "@nextui-org/react";
import { MdCancel } from "react-icons/md";
import {Tooltip} from "@nextui-org/tooltip";
import { useRouter } from 'next/navigation'
import {TagInput} from "@/app/home/materials/TabInput";

export function extractToken(cookieString: string) {
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf('token=') === 0) {
            return cookie.substring(6);
        }
    }
    return null;
}

export const MaterialsForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [formState, setFormState] = React.useState({
        name: '',
        tags: [],
    });



    const [filesName, setFilesName] = React.useState<any[]>([]);
    const onClick = async () => {
        const formData = new FormData();
        const token = extractToken(document.cookie)

        formData.append('company', 'formState.company');
        formData.append('name', formState.name);
        formData.append('tags', formState.tags.join(' '));
        for (let i = 0; i < filesName.length; i++) {
            formData.append('documents', filesName[i]);
        }
        try {
            setIsLoading(true)
            await fetch(process.env.NEXT_PUBLIC_BACKEND + '/product/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Token ' + token
                }
            });
            router.push('/home/materials')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }

    }

    const disableSaveButton = !filesName.length || isLoading || !formState.name;

    return <form className={'flex flex-col gap-4'}  >
        <label className="block">
            <span className="text-gray-700">Product name</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                name={'name'}
                placeholder="Product name*"
                onChange={(e) => {
                    setFormState({
                        ...formState,
                        name: e.target.value
                    })
                }}
            />
        </label>
        <label className="block">
            <span className="text-gray-700">Add tags</span>
            {/*            <input
                type="text"
                className="form-input mt-1 block w-full"
                name={'tags'}
                placeholder="Add tags here"
                onChange={(e) => {
                    setFormState({
                        ...formState,
                        tags: e.target.value
                    })
                }}
            />*/}
            <TagInput setTags={(e) => {
                setFormState({
                    ...formState,
                    tags: e
                })
            }}
            tags = {formState.tags}
            />
        </label>
        <div className="flex gap-2  min-h-48 mb-8 bg-grayb items-center justify-center  flex-col border-dashed border-2 border-primary">
            <div className={`flex flex-col ${filesName?.length === 0 ? 'block' : 'hidden' }`}>
                <label className={'cursor-pointer self-center'}>
                    <Image src={'/elements.svg'} width={50} height={50} alt="pdf"/>
                    <input
                        type="file"
                        name={'documents'}
                        className="opacity-0 fixed"
                        accept={'.pdf,.docx,.txt,.ppt'}
                        onChange={(e:any ) => {
                            setFilesName(
                                Array.from(e.target.files)
                            )
                        }}
                        required
                        multiple
                    />
                </label>
                <span className={'text-sm text-grayLight'}>Click to upload</span>
            </div>

            { filesName.length > 0 && <ul
                className={`list-none max-h-44 p-3 overflow-y-auto my-1 w-full ${filesName.length === 0 ? 'hidden' : 'block'}`}>{filesName.map(
                    (name: string, index: number) => {
                        return <li
                            className={'text-sm bg-darkViolet my-1 p-3 flex justify-between w-full'}
                            key={index}>
                            <Tooltip
                                content={name.name}
                                placement={'top'}
                                className={'truncate'}
                            >

                                <p className={'truncate w-5/6'}>{name.name}</p>
                            </Tooltip>

                            <span
                                onClick={
                                    () => {
                                        setFilesName(filesName.filter((item, i) => i !== index))
                                    }
                                }
                            >
                                <MdCancel
                                    className={'text-red-500 cursor-pointer'}
                                    size={20}
                                />
                            </span>
                        </li>
                    }
                )}</ul>}

        </div>
        <legend className={'text-grayLight'}>Upload File (PDF, DOCX, TXT, PPT files up to 10MB)</legend>
        <Button
            type="submit"
            className="btn-primary w-full rounded"
            color={'primary'}
            isLoading={isLoading}
            isDisabled={disableSaveButton}
            onClick={onClick}
        >
            Upload
        </Button>
    </form>
}

