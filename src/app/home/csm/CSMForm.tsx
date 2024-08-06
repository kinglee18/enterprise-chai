'use client'
import {useFormState, useFormStatus} from "react-dom";
import React from "react";
import {saveSession} from "@/actions/csm";
import {Button} from "@nextui-org/react";


const initialState: any = {
    message: "",
};

interface Phase {
    id: number;
    phase: string;
}
interface CSMFormProps {
    phases: Phase[];
    customers: any[];
}
export const CSMForm = ({phases, customers}: CSMFormProps) => {

    // eslint-disable-next-line no-unused-vars
    const [state, formAction] = useFormState(saveSession, initialState);
    const [selectedCustomer, setSelectedCustomer] = React.useState();

    if (state?.session) {
        window.open(`/session/${state.session}/active`, "CSMWindow", "popup")
    }
    return <form className={'flex flex-col gap-4'} action={formAction}>
        <div className="block">
            <span className="text-gray-700">Customer journey phase *</span>
            <select required className="p-2 h-12 rounded flex items-center w-full border border-gray-500" name={'journey_phase'}>
                {
                    phases.map((phase) => {
                        return <option key={phase.id} value={phase.phase}>{phase.phase}</option>
                    })
                }
            </select>
        </div>
        <div className="block">
            <span className="text-gray-700">Customer *</span>
            <select
                required
                className="p-2 h-12 rounded flex items-center w-full border border-gray-500"
                onChange={(e) => setSelectedCustomer(
                    customers.find((customer) => customer.id === parseInt(e.target.value))
                )}
                name={'customer'}>
                <option selected disabled>Select customer</option>
                {
                    customers.map((customer) => {
                        return <option key={customer.id} value={customer.id}>{customer.name}</option>
                    })
                }
            </select>
        </div>
        { selectedCustomer && <div className="block">
            <span className="text-gray-700">Product*</span>
            <select required className="p-2 h-12 rounded flex items-center w-full border border-gray-500"
                name={'product'}>
                {
                    selectedCustomer.interested_products.map((product) => {
                        return <option key={product.id} value={product.id}>{product.name}</option>
                    })
                }
            </select>
        </div>}
        <div>
            <span className="text-gray-700">Description</span>
            <textarea
                className="form-input block w-full h-28 border border-gray-500"
                name={'description'}>
            </textarea>
        </div>
        <div className={'flex justify-around'}>
            <SaveButtons/>
        </div>

    </form>
}

const SaveButtons = () => {
    const {pending} = useFormStatus();
    if (pending) return <Button
        isLoading={true}
        className=" text-white btn-goback rounded w-[130px] bg-primarySmall">
        Saving...
    </Button>
    return <>

        <Button
            type="submit"
            className=" text-white btn-goback rounded w-[130px] bg-primarySmall"
            name={'launch'}>
            Launch
        </Button>
        <Button
            type="submit"
            className="btn-goback rounded w-[130px] bg-darkViolet700"
            name={'save'}>
            Save for later
        </Button>
    </>
}
