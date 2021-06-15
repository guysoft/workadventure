import {writable} from "svelte/store";

export const chatVisibilityStore = writable(false);

export const newChatMessageStore = writable<string|null>(null);

export enum ChatMessageTypes {
    text=1,
    me,
    userIncoming,
    userOutcoming,
}

export interface ChatMessage {
    type: ChatMessageTypes;
    author?: string;
    visitCardUrl?: string;
    text?: string;
}

function createChatMessagesStore() {
    const { subscribe, update} = writable<ChatMessage[]>([]);

    return {
        subscribe,
        addIncomingUser(author: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.userIncoming,
                    author: author,
                })
                return list;
            });
        },
        addOutcomingUser(author: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.userOutcoming,
                    author: author,
                })
                return list;
            });
        },
        addPersonnalMessage(text:string) {
            newChatMessageStore.set(text);
            update(list => {
                list.push({
                    type: ChatMessageTypes.me,
                    text: text,
                })
                return list;
            });
        },
        addExternalMessage(author: string, text: string) {
            update(list => {
                list.push({
                    type: ChatMessageTypes.text,
                    text: text,
                    author: author,
                })
                return list;
            });
        },
    };
}
export const chatMessagesStore = createChatMessagesStore();