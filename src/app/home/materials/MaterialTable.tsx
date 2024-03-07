'use client'
import Table from "@/components/Table";
import React, {useEffect} from "react";
import {getMaterials} from "@/services/materials";

export default function MaterialsTable() {
    const [data, setData] = React.useState([])
    useEffect(() => {
        const init = async () => {
            const data = await getMaterials();
            setData(data);

        }
        init()
    }, [])
    return (<Table
        title={'Call summary'}
        columns={[
            {title: 'Company', key: 'company', width: '20%'},
            {title: 'Product', key: 'product', width: '20%'},
            {title: 'Tags', key: 'tags', width: '20%'},
            {title: 'Date', key: 'uploaded_at', width: '20%'},
        ]}
        data={[]}
    />)
}
