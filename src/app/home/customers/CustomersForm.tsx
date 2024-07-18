'use client'
import {useFormState, useFormStatus} from "react-dom";
import React from "react";
import {Button} from "@nextui-org/react";
import {saveCustomer} from "@/actions/customer";


const initialState: any = {
    message: "",
};

export const CustomersForm = ({products}) => {
    const [msg, formAction] = useFormState(saveCustomer, initialState);
    console.log(msg)

    return <form className={'flex flex-col gap-4'} action={formAction}>
        <div className="block">
            <span className="text-gray-700">Customer Name *</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                name={'name'}
            />
        </div>
        <div className="block">
            <span className="text-gray-700">Point of Contact*</span>
            <input
                required
                type="text"
                className="form-input mt-1 block w-full"
                name={'point_of_contact'}
                placeholder="Point of contact name"
            />
        </div>
        <div className="block">
            <span className="text-gray-700">Email *</span>
            <input
                required
                type="email"
                className="form-input mt-1 block w-full"
                name={'email'}
                placeholder="customer email"
            />
        </div>
        <div className="block">
            <span className="text-gray-700">Products of interest*</span>
            <select
                multiple
                required
                className="p-2  border rounded flex items-center w-full"
                name={'interested_products'}>
                {
                    products.map((product) => {
                        return <option key={product.id} value={product.id}>{product.name}</option>
                    })
                }
            </select>
        </div>
        {
            msg && <div className="text-red-600">{msg.message}</div>
        }
        <div className={'flex justify-around'}>
            <SaveButton/>
        </div>

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
        Add Customer
    </Button>
}
