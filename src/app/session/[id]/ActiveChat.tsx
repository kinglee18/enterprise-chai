'use client'
import Banner from '@/components/Banner'
import AssistantLayout from '@/components/AssistantLayout'
import Navigation from '@/components/Navigation'
import Tags from '@/components/Tags'
import React, {useEffect, useState} from "react";
import SpeakerBox from "@/components/SpeakerBox";
import ModalComplete from "@/components/ModalComplete";
import {handleStartCapture} from "@/app/session/[id]/sockets";
import {Conversation} from "@/services/csm";
import {useParams} from "next/navigation";
import {Modal, ModalContent} from "@nextui-org/react";

interface ActiveChatProps {
    tabRecorder: MediaRecorder;
    micRecorder: MediaRecorder | null;
    conversation: Conversation;
}

export default function ActiveChat({tabRecorder, micRecorder, conversation}: ActiveChatProps) {

    const searchParams = useParams()
    const conversationId = searchParams.id
    const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
    const [microphoneMessages, setMicrophoneMessages] = useState<string[]>([]);
    const [tabMessages, setTabMessages] = useState<string[]>([]);
    const [completeSessionAlert, setCompleteSessionAlert] = useState(false);
    useEffect(() => {

        const init = async () => {
            await handleStartCapture({
                micRecorder,
                tabRecorder,
                setMicrophoneMessages,
                setTabMessages,
                setAssistantMessages,
                conversationId
            });

        }
        init().then(() => {
            setAssistantMessages(messages => [
                ...messages
            ])
        }).catch(e => e);
        return () => {
            if (tabRecorder.state === 'recording') {
                tabRecorder.stop();
            }
            if (micRecorder.state === 'recording') {
                micRecorder.stop();
            }
        }
    }, [conversationId, micRecorder, tabRecorder]);

    const placeholderClient = 'Your client\'s voice magic is being\n scooped up straight from your browser\n  tab, and you\'ll see it right here.';
    const placeholderUser = 'Your fantastic voice is captured straight \nfrom your microphone, and will be \ndisplayed here.'

    return (
        <div className={'xl:px-32 lg:px-20'}>
            {completeSessionAlert &&
              <Modal
                  isOpen={completeSessionAlert}
                  onClose={() => setCompleteSessionAlert(false)}
                  hideCloseButton
                  className={''}
              >
                  <ModalContent>
                      <ModalComplete conversationId={conversationId} onClose={setCompleteSessionAlert}/>
                  </ModalContent>
              </Modal> }
            <div className="w-full ">
                <Banner />
            </div>
            <div className="w-full h-12  mt-4 mx-auto flex justify-between align-center items-center">
                <div className="w-full">
                    <h2>{`${conversation?.journey_phase} with ${conversation?.point_of_contact}`}</h2>
                </div>
                <Navigation>
                    <button  className={`hidden block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Settings
                    </button>
                    <button className={`hidden block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Auto Scroll
                    </button>
                    <button className={`hidden block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Pause
                    </button>
                    <button
                        onClick={() => {
                            setCompleteSessionAlert(true);
                        }}
                        className={`block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Complete
                    </button>
                </Navigation>
            </div>
            <div className='w-full '>
                <Tags/>
            </div>
            <div className='w-full h-4 flex gap-10'>
                <AssistantLayout messages={assistantMessages} />
                <div className=' flex flex-col w-[320]'>
                    <div>
                        <SpeakerBox name={'Customer'} messages={tabMessages} placeholder={placeholderClient} avatar={'/avatar1.png'}/>
                        <SpeakerBox name={'You'} messages={microphoneMessages} placeholder={placeholderUser} avatar={'/avatar2.png'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
