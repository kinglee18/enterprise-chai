import {getOrderedMessages} from "@/utils";

describe('getOrderedMessages', () => {
    it('returns new message when messages array is empty', () => {
        const newMessage = {answer: 'Hello', is_final: true, timestamp: '07:50 am'};
        const result = getOrderedMessages([], newMessage);
        expect(result).toEqual([newMessage]);
    });

    it('appends new message to messages array when last message is final', () => {
        const messages = [{answer: 'Hello', is_final: true, timestamp: '07:50 am'}];
        const newMessage = {answer: 'World', is_final: true, timestamp: '07:51 am'};
        const result = getOrderedMessages(messages, newMessage);
        expect(result).toEqual([...messages, newMessage]);
    });

    it('merges new message with last message when last message is not final', () => {
        const messages = [{answer: 'Hello', is_final: false, timestamp: '07:50 am'}];
        const newMessage = {answer: 'World', is_final: true, timestamp: '07:51 am'};
        const result = getOrderedMessages(messages, newMessage);
        expect(result).toEqual([{answer: 'Hello World', is_final: true, timestamp: '07:51 am'}]);
    });
});


/*
{"text": "Step 1, let's chat. For first timers,", "is_final": false, "timestamp": "07:49 am"}	93
{"text": "enable your microphone by clicking allow when prompted.", "is_final": true, "timestamp": "07:50 am"}	110
{"text": "A quick refresh, and you're good to go.", "is_final": true, "timestamp": "07:50 am"}	94
{"text": "Step 2, mic check.", "is_final": true, "timestamp": "07:50 am"}	73
{"text": "Choose the microphone you're using.", "is_final": true, "timestamp": "07:50 am"}	90
{"text": "So your real time assistant can hear your brilliant responses loud and", "is_final": false, "timestamp": "07:50 am"}	126
{"text": "clear.", "is_final": true, "timestamp": "07:50 am"}	61
{"text": "Step 3. Launch tab.", "is_final": true, "timestamp": "07:50 am"}	74
{"text": "Share the meeting tab on your browser, so your real time is", "is_final": false, "timestamp": "07:50 am"}	115
{"text": "assistant can be your ultimate guide.", "is_final": true, "timestamp": "07:50 am"}	92
{"text": "Just select the browser tab, and you're all set.", "is_final": true, "timestamp": "07:50 am"}
 */
