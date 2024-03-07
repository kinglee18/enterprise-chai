'use client'
import Banner from '@/components/Banner'
import AssistantLayout from '@/components/AssistantLayout'
import NavItem from '@/components/NavItem'
import Navigation from '@/components/Navigation'
import Tags from '@/components/Tags'
import Title from '@/components/Title'
import {useEffect, useState} from "react";
import SpeakerBox from "@/components/SpeakerBox";
import ModalComplete from "@/components/ModalComplete";
const socketURL = process.env.NEXT_PUBLIC_WS;
const microphoneAudioSocket = socketURL + '/listenmic';
const tabAudioSocket = socketURL + '/listentab';
const assistantSocket = socketURL + '/result';

interface ActiveChatProps {
    tabRecorder: MediaRecorder;
    selectedDeviceId: string;
}
export default function ActiveChat({tabRecorder, selectedDeviceId}: ActiveChatProps) {

    const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
    const [microphoneMessages, setMicrophoneMessages] = useState<string[]>([]);
    const [tabMessages, setTabMessages] = useState<string[]>([]);
    const [completeSessionAlert, setCompleteSessionAlert] = useState(false);

    useEffect(() => {
        const handleStartCapture = async () => {
            const microphoneWS = new WebSocket(microphoneAudioSocket);
            const tabWS = new WebSocket(tabAudioSocket);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedDeviceId } });
                const micRecorder = new MediaRecorder(stream);

                micRecorder.addEventListener('dataavailable', evt => {
                    if (evt.data.size > 0 && microphoneWS.readyState === WebSocket.OPEN) {
                        microphoneWS.send(evt.data);
                    }
                });

                tabRecorder.addEventListener('dataavailable', evt => {
                    if (evt.data.size > 0 && tabWS.readyState === WebSocket.OPEN) {
                        tabWS.send(evt.data);
                    }
                })

                microphoneWS.onopen = () => {
                    micRecorder.start(100)
                };
                microphoneWS.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                microphoneWS.onmessage = (event) => {
                    setMicrophoneMessages(_value => [..._value, event.data]);
                }
                tabWS.onopen = () => {
                    tabRecorder.start(100)
                };
                tabWS.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                tabWS.onmessage = (event) => {
                    setTabMessages(_value => [..._value, event.data]);
                }
                return null
            } catch (error) {
                console.error('Error capturing audio:', error);
            }
        };
        handleStartCapture().then(() => {
            const assistantWS = new WebSocket(assistantSocket);
            assistantWS.onmessage = (event) => {
                setAssistantMessages(_value => [..._value, event.data]);
            }
        })
    }, [selectedDeviceId, tabRecorder]);

    const placeholderClient = 'Your client\'s voice magic is being\n scooped up straight from your browser\n  tab, and you\'ll see it right here.';
    const placeholderUser = 'Your fantastic voice is captured straight \nfrom your microphone, and will be \ndisplayed here.'
  return (
    <div className={'xl:px-32 lg:px-20'}>
        {completeSessionAlert && <ModalComplete/>}
      <div className="w-full ">
        <Banner />
      </div>
      <div className="w-full h-12  mt-4 mx-auto flex justify-between align-center items-center">
        <Title />
        <Navigation>
          <button  className={`block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Settings
          </button>
          <button className={`block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Auto Scroll
          </button>
          <button className={`block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Pause
          </button>
          <button
              onClick={() => {
                    setCompleteSessionAlert(true);
              }
              }
              className={`block py-4 text-base rounded hover:bg-tertiary hover-text-shadow bg-primary text-white nav-item`}>
            Complete
          </button>
        </Navigation>
      </div>
      <div className='w-full '>
        <Tags />
      </div>
      <div className='w-full h-4 flex gap-10'>
        <AssistantLayout messages={assistantMessages} />
        <div className=' flex flex-col w-[320]'>
          <div>
              <SpeakerBox name={'Customer'} messages={tabMessages} placeholder={placeholderClient}/>
              <SpeakerBox name={'You'} messages={microphoneMessages} placeholder={placeholderUser}/>
          </div>
        </div>
      </div>
    </div>
  )
}
