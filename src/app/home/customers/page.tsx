import {getCustomers} from "@/services/customers";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {CustomersForm} from "@/app/home/customers/CustomersForm";
import Header from "@/components/Header";
import CustomersTable from "@/app/home/customers/CustomersTable";
import React from "react";
import {getProducts} from "@/services/products";

export default async function Customers({
    searchParams
}) {
    const customers = await getCustomers();
    const products = await getProducts();


    return (

        <main className="w-full px-9">
            <Modal
                isOpen={searchParams.action === 'new'}
                closeButton={<a href={'/home/customers'}>X</a>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <p className={'text-primarySmall'}>Add a new Customer</p>
                    </ModalHeader>
                    <ModalBody>
                        <CustomersForm products={products.products}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Header
                title={'Customers'}
                subtitle={'Manage your customer information here. Add new customers, view and update existing customer details, and keep track of their product interests.'}/>
            <div className="flex justify-end gap-x-3">
                <a href={'/home/customers?action=new'}>
                    <button className={'bg-primarySmall text-white w-36 h-12'}>New</button>
                </a>
            </div>
            <div>
                <CustomersTable data={customers}/>
            </div>
        </main>
    )
}
