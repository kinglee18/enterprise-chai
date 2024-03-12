import Header from "@/components/Header";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import {MaterialsForm} from "@/app/home/materials/MaterialsForm";
import Table from "@/components/Table";
import MaterialsTable from "@/app/home/materials/MaterialTable";
import {getMaterials} from "@/services/materials";


export default async function Materials({
                                            searchParams
                                        }) {
    const data = await getMaterials();

    return (
        <main className="w-full px-9">
            <Modal
                isOpen={searchParams.action === 'new'}
                closeButton={<a href={'/home/materials'}>X</a>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <p className={'text-primarySmall'}>Upload a new document</p>
                        <p>List of recommended documents</p>

                    </ModalHeader>
                    <ModalBody>
                        <MaterialsForm/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Header title={'Materials'} subtitle={''}/>
            <div className="flex justify-end gap-x-3">
                <a href={'/home/materials?action=new'}>
                    <button className={'bg-darkViolet700 w-36 h-12'}>
                        Template
                    </button>
                </a>
                <a href={'/home/materials?action=new'}>
                    <button className={'bg-primarySmall text-white w-36 h-12'}>New</button>
                </a>
            </div>
            <div>
                <MaterialsTable data={data.materials}/>
            </div>
        </main>
    )
}



