import moment from "moment";


export default function Congratulations({summaryInfo}) {
    console.log(summaryInfo)
    const createdAT = moment(summaryInfo.session.created_at).format('MMMM Do YYYY | h:mm:ss a (PST)');
    return (
        <div>
            <div className=" items-center font-bold gap-1 pt-9">
                <span className="text-2xl text-primarySmall">{summaryInfo.session.journey_phase}</span>
            </div>
            <p className="text-[#52525B] font-montserrat text-sm font-normal leading-[25px] tracking-[0.14px] my-2">
                {`${createdAT} | #${summaryInfo.session.session_number}`}
            </p>
        </div>
    )
}
