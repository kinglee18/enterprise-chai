'use client'
import Header from "@/components/Header";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {MaterialsForm} from "@/app/home/materials/MaterialsForm";
import Table from "@/components/Table";
import MaterialsTable from "@/app/home/materials/MaterialTable";


export default function Materials() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <main className="w-full px-9">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className={'text-primarySmall'}>Upload a new document</p>
                                <p>List of recommended documents</p>

                            </ModalHeader>
                            <ModalBody>
                               <MaterialsForm/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Header title={'Materials'} subtitle={''}/>
            <div className="flex justify-end gap-x-3">
                <button
                    className={'bg-darkViolet700 w-36 h-12'}
                    onClick={onOpen}
                >Template
                </button>
                <button className={'bg-primarySmall text-white w-36 h-12'}>New</button>
            </div>
            <div>
                <MaterialsTable/>
            </div>
        </main>
    )
}



