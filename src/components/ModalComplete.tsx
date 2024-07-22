import {useFormState} from "react-dom";
import {completeConversation} from "@/actions/csm";

interface ModalCompleteProps {
    conversationId: string;
    setCompleteSessionAlert: void;
}
export default function ModalComplete({
    conversationId,
    setCompleteSessionAlert
} : ModalCompleteProps
) {
    const initialState = {
        message: "",
    }
    // eslint-disable-next-line no-unused-vars
    const [state, formAction] = useFormState(completeConversation, initialState);

    return (
        <form
            className={"  h-full w-full overflow-y-auto overflow-x-hidden outline-none"}
            action={formAction}
        >
            <div className="bg-violetLight w-[500px] h-[160px] flex flex-col justify-center items-center rounded-lg  relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto -[576px]:max-w-[500px] transform-none opacity-100">
                <input type="hidden" name="conversationId" value={conversationId}/>
                <p className="text-lg text-primarySmall">Are you sure you want to complete your session?</p>
                <div className="flex w-[292px] justify-between items-center pt-4">
                    <button className="btn-goback bg-whiteGray" onClick={
                        () => {
                            setCompleteSessionAlert(false);
                        }
                    }>Go Back</button>
                    <a href={`/session/${conversationId}/finished`}>
                        <button className="btn-goback bg-primarySmall text-white">Complete</button>
                    </a>
                </div>
            </div>
        </form>
    )
}
