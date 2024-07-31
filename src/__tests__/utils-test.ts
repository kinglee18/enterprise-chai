import {getOrderedMessages} from "@/utils";

describe('getOrderedMessages', () => {
    it('returns new message when messages array is empty', () => {
        const newMessage = {text: 'Hello', is_final: true, timestamp: '07:50 am'};
        const result = getOrderedMessages([], newMessage);
        expect(result).toEqual([newMessage]);
    });

    it('appends new message to messages array when last message is final', () => {
        const messages = [{text: 'Hello', is_final: true, timestamp: '07:50 am'}];
        const newMessage = {text: 'World', is_final: true, timestamp: '07:51 am'};
        const result = getOrderedMessages(messages, newMessage);
        expect(result).toEqual([...messages, newMessage]);
    });

    it('merges new message with last message when last message is not final', () => {
        const messages = [{text: 'Hello', is_final: false, timestamp: '07:50 am'}];
        const newMessage = {text: 'World', is_final: true, timestamp: '07:51 am'};
        const result = getOrderedMessages(messages, newMessage);
        expect(result).toEqual([{text: 'HelloWorld', is_final: true, timestamp: '07:51 am'}]);
    });

    it('append new message to messages array when last message is not final and the previous message is final', () => {
        const messages = [{text: 'Hello', is_final: true, timestamp: '07:50 am'}];
        const newMessage = {text: 'World', is_final: true, timestamp: '07:51 am'};
        const result = getOrderedMessages(messages, newMessage);
        expect(result).toEqual([...messages, newMessage]);
    })
});


