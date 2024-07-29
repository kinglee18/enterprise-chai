import Table from "@/components/Table";
import  moment from 'moment';
import React from "react";
import {DeleteMaterialForm} from "@/app/home/materials/FeleteMaterialForm";
import {Chip} from "@nextui-org/chip";

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
            name: item.product.name,
            tags: <div className={'flex gap-1'}> {item.product.tags.split(" ").map(
                (tag, index) =>
                    <Chip
                        key={'tag' + index}
                        className="flex-shrink-0 rounded bg-violet-100 shadow-md  h-6 overflow-hidden"
                    >{tag}</Chip>
            )} </div>,
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
        columns={[
            {title: 'Name', key: 'name', width: 'w-[50p]'},
            {title: 'Tags', key: 'tags', width: 'w-[50p]'},
            {title: 'Document', key: 'document', width: 'w-[50p]'},
            {title: 'Date', key: 'created_at', width: 'w-[50p]'},
            {title: '', key: 'tools', width: 'w-[50p]'},
        ]}
        data={_data || []}
    />)
}
