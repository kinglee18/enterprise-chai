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
import AppTabs, {AppTabsProps} from "@/app/home/csm/tabs";
import {getCustomers} from "@/services/customers";

export default async function List({searchParams}: any ) {
    const isPending = searchParams.status === 'pending' || !searchParams.status;
    const phases = await getJourneyPhases()
    const sessions = await getSessions(isPending)
    const products = await getProducts();
    const customers = await getCustomers();
    const tableTitle = isPending ? "Active created sessions" : "Call Summary";




    const pendingCallsColumns: TableColumn[] = [
        { key: 'customer', title: 'Customer' },
        { key: 'point_of_contact', title: 'Customer point of contact' },
        { key: 'conversationIntent', title: 'Conversation Intent' },
        { key: 'created', title: 'Created', width: 'w-1/4' },
        { key: 'tools', title:'',width:'w-1/4' },
    ];

    const finishedCallsColumns: TableColumn[] = [
        { key: 'session_number', title: 'Session no' },
        { key: 'conversationIntent', title: 'Conversation Intent' },
        { key: 'customer', title: 'Customer' },
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
            customer: session['customer'].name,
            point_of_contact: session['customer']['point_of_contact'],
            conversationIntent: session['journey_phase'],
            created: moment(session['created_at']).format('DD-MMM-YYYY hh:mm a'),
            tools: isPending ? getTools(session.id) : completedSessionTools(session.id),
        }
    })
    const tabContent: AppTabsProps = [
        {
            tabContent: <Table
                key={1}
                title={tableTitle}
                columns={isPending ? pendingCallsColumns : finishedCallsColumns}
                data={data}
            />,
            title: 'Active sessions',
            url: '/home/csm?status=pending'
        },
        {
            tabContent: <Table
                key={2}
                title={tableTitle}
                columns={isPending ? pendingCallsColumns : finishedCallsColumns}
                data={data}
            />,
            title: 'Completed sessions',
            url: '/home/csm?status=completed'
        }
    ]
    return (
        <div className="w-full px-9">
            <Header title={'CSM Companion'} subtitle={'Manage your customer success sessions here. Create new sessions, view active and completed sessions, and relaunch as needed.'}/>
            <div className={'justify-center my-5'}>

                <div className="flex gap-x-3">
                    <a href="/home/csm?action=new">
                        <button className="btn-feedback">
                            Create session
                        </button>
                    </a>
                </div>

            </div>
            <AppTabs tabContent={tabContent} isNew={searchParams.action === 'new'}/>
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
                        <CSMForm phases={phases.phases} products={products.products} customers={customers}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

