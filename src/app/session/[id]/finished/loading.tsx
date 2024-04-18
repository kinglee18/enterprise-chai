export default function Loading() {
    return (
        <div className="">

            <div className="fixed top-0 right-0 left-0 z-50  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex  justify-center flex-col gap-8">
                <div className="spinner"></div>
                <div className={'text-primarySmall'}>Generating call summary....</div>
            </div>
        </div>
    )
}
