'use client'
import Image from 'next/image'

interface TabAudioProps {
    recorder: MediaRecorder | null;
    setActiveSession: (active: boolean) => void;
    handleTabAudio: () => void;
}
export default function TabAudio({recorder, setActiveSession, handleTabAudio}: TabAudioProps) {
    const handleContinue = () => {
        setActiveSession(true);
    }
  return (
    <div className="w-[560px] h-[180px] bg-grayLight rounded-lg">
      <div className="h-12 bg-grayPlate rounded-t-lg flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <Image
          src={'/monitor-02.png'}
          alt='monitor'
          width={24}
          height={24}
          />
          <span className="text-white">Browser Tab Audio</span>
        </div>
        <div>
            {recorder !== null ? <Image
                src={'/check-circle.png'}
                alt='check-circle'
                width={24}
                height={24}
            /> : <Image
                src={'/x-circle.png'}
                alt='x circle'
                width={24}
                height={24}
            />}
        </div>
      </div>
      <div className='flex flex-col  justify-center items-center' onClick={handleTabAudio}>
          <div className={'p-3 bg-white w-11/12 my-3 text-viewPlaceholder cursor-pointer'}>{recorder !== null ? 'Recording tab' : 'no tab selected'}</div>
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
