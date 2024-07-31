const socketURL = process.env.NEXT_PUBLIC_WS;



export const handleStartCapture = async ({
    tabRecorder,
    micRecorder,
    setMicrophoneMessages,
    setTabMessages,
    setAssistantMessages,
    conversationId
}) => {
    // add conversationId to the socketURL

    const microphoneAudioSocket = socketURL + '/listenmic?session=' + conversationId;
    const tabAudioSocket = socketURL + '/listentab?session=' + conversationId;
    const assistantSocket = socketURL + '/result?session=' + conversationId;

    const microphoneWS = new WebSocket(microphoneAudioSocket);
    const tabWS = new WebSocket(tabAudioSocket);
    const assistantWS = new WebSocket(assistantSocket);

    try {


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
            throw new Error('WebSocket error:', error);
        };
        microphoneWS.onmessage = (event) => {
            setMicrophoneMessages(_value => getOrderedMessages(_value, JSON.parse(event.data)));
        }
        tabWS.onopen = () => {
            tabRecorder.start(100)
        };
        tabWS.onerror = (error) => {
            throw new Error('WebSocket error:', error);
        };
        tabWS.onmessage = (event) => {
            setTabMessages(_value => getOrderedMessages(_value, JSON.parse(event.data)));
        }
        assistantWS.onmessage = (event) => {
            const newMessage = JSON.parse(event.data);
            //add the previous messages to the array. replace the last message in the array if it does not contain the field source_type

            setAssistantMessages(_value => {
                if (_value.length > 0 &&
                    (!_value[_value.length - 1].source_type || _value[_value.length - 1].source_type === '' )){

                    _value[_value.length - 1] = newMessage;
                    return [..._value];
                }
                if(_value.length > 0 && _value[_value.length - 1].answer === newMessage.answer){
                    _value[_value.length - 1] = newMessage;
                    return [..._value];
                }
                return [..._value, newMessage];
            });

        }
        assistantWS.onerror = (error) => {
            throw new Error('WebSocket error:', error);
        }
    } catch (error) {
        console.error('Error capturing audio:', error);
    }
};



type Message = {
    answer: string,
    source_type: string,
    is_final: boolean,
    type: string

}

const getOrderedMessages = (prevMessages: Message[], newMsg) => {
    if (newMsg.answer === '') return prevMessages;
    if (prevMessages.length > 0 && !newMsg.is_final && !prevMessages[prevMessages.length - 1].is_final) {
        prevMessages[prevMessages.length - 1] = newMsg;
        return [...prevMessages];
    }
    if (prevMessages.length > 0 && newMsg.is_final && prevMessages[prevMessages.length - 1].is_final) {
        return [...prevMessages, newMsg];
    }
    return [...prevMessages, newMsg];
}
