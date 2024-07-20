'use client'
import Step from "@/components/Step"
import TabAudio from "@/components/TabAudio"
import Dropdown from "@/components/Dropdown";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import ActiveChat from "@/app/session/[id]/ActiveChat";


export default function AudioConfig({conversation}) {
    const [audioDevices, setAudioDevices] = useState<any>([]);
    const [recorder, setRecorder] = useState<MediaRecorder| null>(null);
    const [micRecorder, setMicRecorder] = useState<MediaRecorder| null>(null);
    const [activeSession, setActiveSession] = useState<boolean>(false);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');



    const handleTabAudio = async () => {
        try {
            // eslint-disable-next-line no-undef
            const controller = new CaptureController();
            const stream = await navigator.mediaDevices.getDisplayMedia({ controller, audio: true });
            controller.setFocusBehavior("no-focus-change");
            const recorder = new MediaRecorder(stream);
            setRecorder(recorder);
            const stream2 = await navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedDeviceId } });
            const micRecorder = new MediaRecorder(stream2);
            setMicRecorder(micRecorder);
        } catch (error) {
            console.error('Error capturing audio:', error);
        }
    };

    useEffect(() => {
        async function fetchAudioDevices() {
            try {
                const permission = await navigator.mediaDevices.getUserMedia({ audio: true })
                if (!permission) {
                    alert('You need to allow the microphone to use this feature');
                    return;
                }
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput').map(device => ({
                    label: device.label,
                    value: device.deviceId
                }));
                setAudioDevices(audioInputs);
                setSelectedDeviceId(audioInputs[0].value)
            } catch (error) {
                console.error('Error fetching audio devices:', error);
            }
        }

        fetchAudioDevices();
        return () => {
            if (recorder) {
                recorder.stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [recorder]);


    const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDeviceId(event.target.value);
    };

    if (activeSession && recorder !== null && conversation !== undefined) {
        return (
            <ActiveChat tabRecorder={recorder} micRecorder={micRecorder} conversation={conversation}/>
        )
    }

    return (
        <main className="w-full h-[1040px] flex flex-col items-center mt-[78px] ">
            <div>
                <div className={'text-primarySmall text-xl flex ml-auto'}>
                    <p>
                        Welcome aboard to your&nbsp;
                    </p>
                    <span className={'text-primarySmall font-medium'}>Enterprise</span>
                    <span className={'text-primarySmall font-bold'}>CH</span>
                    <span className={'text-greenLogo font-bold'}>AI</span>
                    <p> &nbsp;Assistant</p>
                </div>
            </div>
            <div>
                <p className="text-base leading-5 py-10">To make this experience tailored just for you, let&apos;s set up your audio preferences.</p>
            </div>
            <div className="flex gap-12">
                <div>
                    <Step title={'Step 1 - Let’s chat!'} text={<div>
                        <span>For first-timers, </span>
                        <span className={'text-primarySmall'}>enable your microphone&nbsp;</span>
                        <span>by <br />clicking &ldquo;Allow&ldquo; when prompted. A quick refresh,<br/> and you&apos;re good to go!</span>
                    </div>}/>
                    <Step title={'Step 2: Mic Check!'} text={<div>
                        <span className={'text-primarySmall'}>Choose the microphone</span>
                        &nbsp;you&apos;re using, so your real-time assistant can hear your brilliant responses loud and clear.
                    </div>}/>
                    <Step title={'Step 3: Launch Tab!'} text={<div>
                        <span className={'text-primarySmall'}>Share the meeting</span> tab on your browser, so your real-time assistant can be your ultimate guide. Just select the browser tab, and you&apos;re all set.
                    </div>}/>
                </div>
                <div className="grid gap-20 grid-cols-1">
                    <div className="w-[560px] h-[180px] bg-primaryBG rounded-lg ">
                        <div className="h-12 bg-primarySmall rounded-t-lg flex items-center justify-between gap-4 p-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={'/mic.png'}
                                    alt='microphone'
                                    width={24}
                                    height={24}
                                />
                                <span className="text-white">Computer Audio</span>
                            </div>

                        </div>

                        <div className="pt-10 p-5">
                            <Dropdown {...{options: audioDevices, onChange: handleDeviceChange, value: selectedDeviceId}}/>
                        </div>
                    </div>
                    <TabAudio handleTabAudio={handleTabAudio} setActiveSession={setActiveSession} recorder={recorder}/>
                </div>
            </div>
        </main>
    )
}
