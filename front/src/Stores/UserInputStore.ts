import {derived} from "svelte/store";
import {chatVisibilityStore} from "./ChatStore";

export const enableUserInputsStore = derived(
    chatVisibilityStore,
    ($chatVisibilityStore) => {
        return !$chatVisibilityStore;
    }
);