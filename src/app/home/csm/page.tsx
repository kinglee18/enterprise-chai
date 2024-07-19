import Header from "@/components/Header";
import Table from "@/components/Table";
import {TableRow, TableColumn } from "@/components/Table"
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import React from "react";
import moment from "moment";
import {CSMForm} from "@/app/home/csm/CSMForm";
import {getJourneyPhases, getSessions} from "@/services/sessions";
import {DeleteForm} from "@/app/home/csm/DeleteSessionForm";
import {getProducts} from "@/services/products";
import Anchor from "@/app/home/csm/anchor";

export default async function List({searchParams}: any ) {
    const isPending = searchParams.status === 'pending' || !searchParams.status;
    const phases = await getJourneyPhases()
    const sessions = await getSessions(isPending)
    const products = await getProducts();
    const tableTitle = isPending ? "Active created sessions" : "Call Summary";




    const pendingCallsColumns: TableColumn[] = [
        { key: 'customerCompanyName', title: 'Company name' },
        { key: 'customerPoint', title: 'Customer point of contact' },
        { key: 'conversationIntent', title: 'Conversation Intent' },
        { key: 'created', title: 'Created', width: 'w-1/4' },
        { key: 'tools', title:'',width:'w-1/4' },
    ];

    const finishedCallsColumns: TableColumn[] = [
        { key: 'session_number', title: 'Session no' },
        { key: 'conversationIntent', title: 'Conversation Intent' },
        { key: 'customerCompanyName', title: 'Company name' },
        { key: 'created', title: 'Date' },
        { key: 'tools', title:'',width:'w-1/4' }
    ];
    const getTools = (id: number) => (
        <div className="flex items-center justify-end gap-6">
            <Anchor url={`/session/${id}/active`} text={'Launch'}/>
            <DeleteForm id={id}/>
        </div>
    )
    const completedSessionTools = (id: number) => (
        <div className="flex items-center justify-end gap-6">
            <a
                className={'bg-violetLight rounded px-2 py-1 shadow-md cursor-pointer'}
                href={`/session/${id}/finished`} >
                Summary
            </a>
        </div>
    )
    const data: TableRow[] = sessions.sessions.map((session:any) => {
        return {
            ...session,
            customerCompanyName: session['product_company'],
            customerPoint: session['point_of_contact'],
            conversationIntent: session['journey_phase'],
            created: moment(session['created_at']).format('DD-MMM-YYYY hh:mm a'),
            tools: isPending ? getTools(session.id) : completedSessionTools(session.id),
        }
    })
    return (
        <div className="w-full px-9">
            <Header title={'CSM Companion'} subtitle={'Manage your customer success sessions here. Create new sessions, view active and completed sessions, and relaunch as needed.'}/>
            <div className='flex align-middle gap-x-3'>
                <a href={`/home/csm?status=pending`}>
                    <button className={`btn-intents  ${isPending ?  'font-bold' : 'text-grayDark1'}`}>
                        Created sessions
                    </button>
                </a>
                <a href={`/home/csm?status=completed`}>
                    <button className={`btn-intents  ${!isPending ?  'font-bold' : 'text-grayDark1'}`}>Completed sessions</button>
                </a>
            </div>
            <div className="flex justify-end gap-x-3">
                <button className="btn-settings">Settings</button>

                <a href="/home/csm?action=new">
                    <button className="btn-feedback">
                        Create session
                    </button>
                </a>

            </div>
            <Table
                title={tableTitle}
                columns={isPending ? pendingCallsColumns : finishedCallsColumns}
                data={data}
            />
            <Modal
                isOpen={searchParams.action === 'new'}
                size={'xl'}
                closeButton={<a href={'/home/csm'}>X</a>}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <p className={'text-primarySmall'}>Create new session</p>
                    </ModalHeader>
                    <ModalBody>
                        <CSMForm phases={phases.phases} products={products.products}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

