'use client'
import {useFormState, useFormStatus} from "react-dom";
import {saveFile} from "@/actions/materials";
import React from "react";
import Image from "next/image";


const initialState = {
    message: "",
};

export const MaterialsForm = () => {
    const [state, formAction] = useFormState(saveFile, initialState);
    const [filename, setFilename] = React.useState('')

    return <form className={'flex flex-col gap-4'} action={formAction}>
        <label className="block">
            <span className="text-gray-700">Customer company name*</span>
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
                name={'product'}
                placeholder="Product name*"
            />
        </label>
        <label className="block">
            <span className="text-gray-700">Add tags</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                name={'tags'}
                placeholder="Add tags here"
            />
        </label>
        <div className="flex gap-2  pb-4 mb-8 bg-grayb items-center justify-center h-32 flex-col border-dashed border-2 border-primary">
            <label className={'cursor-pointer'}>
                <Image src={'/elements.svg'} width={50} height={50} alt="pdf"/>
                <input
                    type="file"
                    name={'file'}
                    className="hidden"
                    accept={'.pdf,.docx,.txt,.ppt'}
                    onChange={(e) => setFilename(e.target.files[0].name)}
                />
            </label>
            {
                filename === '' ?
                    <span className={'text-sm text-grayLight'}>Click to upload</span> :
                    <span className={'text-sm text-grayLight'}>{filename}</span>
            }


        </div>
        <legend className={'text-grayLight'}>Upload File (PDF, DOCX, TXT, PPT files up to 10MB)</legend>
        <button type="submit" className="btn-primary w-full">
            Upload
        </button>
    </form>
}
