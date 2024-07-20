'use client'
import Image from 'next/image'

interface TabAudioProps {
    recorder: MediaRecorder | null;
    // eslint-disable-next-line no-unused-vars
    setActiveSession: (active: boolean) => void;
    handleTabAudio: () => void;
}
export default function TabAudio({recorder, setActiveSession, handleTabAudio}: TabAudioProps) {
    const handleContinue = () => {
        setActiveSession(true);
    }
    return (
        <div className="w-[560px] h-[180px] bg-primaryBG rounded-lg">
            <div className="h-12 bg-primarySmall rounded-t-lg flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={'/monitor-02.png'}
                        alt='monitor'
                        width={24}
                        height={24}
                    />
                    <span className="text-white">Browser Tab Audio</span>
                </div>

            </div>
            <div className='flex flex-col  justify-center items-center' onClick={handleTabAudio}>
                <div className={'p-3  w-11/12 my-3 text-viewPlaceholder cursor-pointer'}></div>
                <button className='btn-primary' >Configure</button>
            </div>
            <div className='mt-16 flex justify-end'>
                <button
                    className={`${recorder ?'btn-primary' : 'btn-secondary' } place-self-end`}
                    onClick={handleContinue}
                    disabled={!recorder}
                >Continue</button>
            </div>
        </div>
    )
}
