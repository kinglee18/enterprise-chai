
export default function SessionComplete({summaryInfo}) {
    return (
        <div className="flex-col w-full">
            <main className="px-8  gap-y-8 grid bg-darkViolet border-2 pt-3.5 rounded-lg shadow-violetShadow">
                <div className="flex justify-between items-center">
                    <span>
                        <span className="text-primarySmall text-medium mr-2">Session No:</span>
                        {summaryInfo.session.session_number}
                    </span>
                    <span>
                        <span className="text-primarySmall mr-2">Company name:</span>
                        {summaryInfo.session.product_company}</span>
                    <span>
                        <span className="text-primarySmall mr-2">Customer point of contact:</span>
                        {summaryInfo.session.point_of_contact}</span>
                </div>
                <div>
                    <h5 className="text-lg text-primarySmall font-bold">Session Summary:</h5>
                    <p>
                        {
                            summaryInfo.description && summaryInfo.description.split('\n').map((line, index) => (
                                <div key={index} className={line.startsWith('**') ? 'font-bold' : ''}>
                                    {line}
                                </div>
                            ))
                        }
                    </p>
                </div>
                <div>
                    <h5 className="text-lg text-primarySmall font-bold">Areas of Improvement:</h5>
                    <ul className="list-disc px-8 pt-4">
                        {
                            summaryInfo.improvement_areas
                        }
                    </ul>
                </div>
                <div>
                    <h5 className="text-lg text-primarySmall font-bold">Overall Session Score:
                        <span className="text-greenDark pl-1">{summaryInfo.score} out of 10</span>
                    </h5>
                    <p className="pt-4 pb-10">{summaryInfo.score_breakdown}</p>
                </div>
            </main>
        </div>
    )
}
