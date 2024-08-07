import Table from "@/components/Table";
import React from "react";
import {Customer} from "@/services/customers";

interface  MaterialsTableProps {
    data: Array<Customer>;
}
export default function CustomersTable({data}: MaterialsTableProps) {

    const _data = data.map((item) => {

        return {
            ...item,
            interested_products: item.interested_products.map((product) => product.name).join(', ')
        }
    })


    return (<Table
        columns={[
            {title: 'Name', key: 'name', width: 'w-[50p]'},
            {title: 'Email', key: 'email', width: 'w-[50p]'},
            {title: 'Point Of Contact', key: 'point_of_contact', width: 'w-[50p]'},
            {title: 'Products', key: 'interested_products', width: 'w-[50p]'},
            {title: '', key: 'tools', width: 'w-[50p]'},
        ]}
        data={_data}
    />)
}
