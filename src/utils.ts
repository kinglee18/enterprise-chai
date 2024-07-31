


type Message = {
    text: string,
    is_final: boolean,
    timestamp: string

}
//if the array is empty, return the new message
//if the last message in the array is not final, merge the new message with the last message
//if the last message in the array is final and the new message is final, append the new message to the array
//if the last message in the array is final and the new message is not final, append the new message to the array
//if the last message in the array is not final and the new message is not final, merge the new message with the last message
//if the last message in the array is not final and the new message is final, merge the new message with the last message
export const getOrderedMessages = (messages: Message[], newMessage: Message) => {
    if (messages.length === 0) {
        return [newMessage];
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage.is_final) {
        const mergedMessage = {
            text: lastMessage.text + newMessage.text,
            is_final: newMessage.is_final,
            timestamp: newMessage.timestamp
        };
        return [...messages.slice(0, -1), mergedMessage];
    }

    return [...messages, newMessage];
}
