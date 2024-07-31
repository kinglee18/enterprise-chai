


type Message = {
    answer: string,
    source_type: string,
    is_final: boolean,
    type: string

}

export const getOrderedMessages = (messages: Message[], newMessage: Message) => {
    if (messages.length === 0) {
        return [newMessage];
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage.is_final && newMessage.is_final) {
        const updatedLastMessage: Message = {
            answer: lastMessage.answer + ' ' + newMessage.answer,
            is_final: true,
            timestamp: newMessage.timestamp
        };
        return [...messages.slice(0, -1), updatedLastMessage];
    } else {
        return [...messages, newMessage];
    }
}
