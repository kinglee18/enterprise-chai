'use client'
import {useFormState, useFormStatus} from "react-dom";
import {saveFile} from "@/actions/materials";
import React from "react";
import Image from "next/image";
import {Button} from "@nextui-org/react";


const initialState: any = {
    message: "",
};

export const MaterialsForm = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, formAction] = useFormState(saveFile, initialState);
    const [filesName, setFilesName] = React.useState<any>('');

    return <form className={'flex flex-col gap-4'} action={formAction}>
        <label className="block">
            <span className="text-gray-700">Customer company *</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                placeholder="Customer company name*"
                name={'company'}
            />
        </label>
        <label className="block">
            <span className="text-gray-700">Product name</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                name={'name'}
                placeholder="Product name*"
            />
        </label>
        <label className="block">
            <span className="text-gray-700">Add tags</span>
            <input
                type="text"
                className="form-input mt-1 block w-full"
                name={'tags'}
                placeholder="Add tags here"
            />
        </label>
        <div className="flex gap-2  min-h-48 mb-8 bg-grayb items-center justify-center  flex-col border-dashed border-2 border-primary">


            <div className={`flex flex-col ${filesName === '' ? 'block' : 'hidden' }`}>
                <label className={'cursor-pointer self-center'}>
                    <Image src={'/elements.svg'} width={50} height={50} alt="pdf"/>
                    <input
                        type="file"
                        name={'documents'}
                        className="hidden"
                        accept={'.pdf,.docx,.txt,.ppt'}
                        onChange={(e:any ) => {
                            setFilesName(
                                Array.from(e.target.files).map((file: any) => file.name)
                            )
                        }}
                        required
                        multiple
                    />
                </label>
                <span className={'text-sm text-grayLight'}>Click to upload</span>
            </div>

            { filesName !== '' && <ul
                className={`list-none max-h-44 p-3 overflow-y-auto my-1 ${filesName === '' ? 'hidden' : 'block'}`}>{filesName.map(
                    (name: string, index: number) => {
                        return <li
                            className={'text-sm bg-darkViolet my-1 p-3'}
                            key={index}>{name}</li>
                    }
                )}</ul>}

        </div>
        <legend className={'text-grayLight'}>Upload File (PDF, DOCX, TXT, PPT files up to 10MB)</legend>
        <SaveButton/>
    </form>
}

const SaveButton = () => {
    const { pending } = useFormStatus();
    return <Button
        type="submit"
        className="btn-primary w-full"
        color={'primary'}
        isLoading={pending}
        disabled={pending}
    >
        Upload
    </Button>
}
