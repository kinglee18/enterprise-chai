import {getOrderedMessages, utcHourToLocale} from "@/utils";

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
            const data = JSON.parse(event.data)
            const newMessage = {
                ...data,
                timestamp: utcHourToLocale(data.timestamp)
            }
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

