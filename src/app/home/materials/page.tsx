import Header from "@/components/Header";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import {MaterialsForm} from "@/app/home/materials/MaterialsForm";
import MaterialsTable from "@/app/home/materials/MaterialTable";
import {getMaterials, getTemplates} from "@/services/materials";
import TemplatesTable from "@/app/home/materials/TemplatesTable";
import { Card, CardBody} from "@nextui-org/react";


export default async function Materials({searchParams}: any ) {
    const data = await getMaterials();
    const templates = await getTemplates();
    return (
        <main className="w-full px-9">
            <Modal
                isOpen={searchParams.action === 'new'}
                size={'xl'}
                closeButton={<a href={'/home/materials'}>X</a>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <p className={'text-primarySmall'}>Upload a new document</p>
                    </ModalHeader>
                    <ModalBody>
                        <MaterialsForm/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={searchParams.action === 'template'}
                size={'xl'}
                closeButton={<a href={'/home/materials'}>X</a>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <p className={'text-lg font-bold'}>Recommended Documents</p>
                    </ModalHeader>
                    <ModalBody>
                        <TemplatesTable data={templates}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Header
                title={'Reference Materials'}
                subtitle={'Access a wide range of documents including product docs, KB articles, best practices, presentations, and past conversations. Upload new resources or search through existing ones.'}/>
            <div className="flex   my-5">
                <a href={'/home/materials?action=template'}>
                    <button className={'bg-darkViolet700 w-36 h-12 hidden'}>
                        Template
                    </button>
                </a>
                <a href={'/home/materials?action=new'}>
                    <button className={'bg-primarySmall text-white w-36 rounded h-12'}>New</button>
                </a>
            </div>
            <div>
                <Card>
                    <CardBody>
                        <MaterialsTable data={data.materials}/>

                    </CardBody>
                </Card>
            </div>
        </main>
    )
}



