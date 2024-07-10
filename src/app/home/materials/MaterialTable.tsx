import Table from "@/components/Table";
import  moment from 'moment';
import React from "react";
import {DeleteMaterialForm} from "@/app/home/materials/FeleteMaterialForm";

interface  MaterialsTableProps {
    data: Array<any>;
}
export default function MaterialsTable({data}: MaterialsTableProps) {
    const getTools = (id: number) => (
        <div className="flex items-center justify-end gap-6">
            <DeleteMaterialForm id={id}/>
        </div>
    )
    console.log(data)
    const _data = data.map((item) => {

        return {
            company: item.product.company,
            name: item.product.name,
            tags: item.product.tags,
            created_at: moment(item.created_at).format('DD-MMM-YYYY hh:mm a'),
            document: <a
                href={`${item.file}.replace('http://backend', process.env.NEXT_PUBLIC_BACKEND`}
                className={'w-full contents'}
                target={'_blank'}>{item.file.split('/').pop()}
            </a>,
            tools: getTools(item.id)
        }
    })


    return (<Table
        title={'Recent Documents'}
        columns={[
            {title: 'Company', key: 'company', width: 'w-[50p]'},
            {title: 'Name', key: 'name', width: 'w-[50p]'},
            {title: 'Tags', key: 'tags', width: 'w-[50p]'},
            {title: 'Document', key: 'document', width: 'w-[50p]'},
            {title: 'Date', key: 'created_at', width: 'w-[50p]'},
            {title: '', key: 'tools', width: 'w-[50p]'},
        ]}
        data={_data || []}
    />)
}
