<script lang="ts">
    import {chatMessagesStore, ChatMessageTypes} from "../../Stores/ChatStore";

    let newMessageText = '';

    function saveMessage() {
        chatMessagesStore.addMessage({
            text: newMessageText,
            author: 'me',
            type: ChatMessageTypes.text,
        });
        newMessageText = '';
    }
</script>

<form on:submit|preventDefault={saveMessage}>
    <input type="text" bind:value={newMessageText} placeholder="Type here"><button type="submit">Save</button>
</form>

<style>
    * {
        font-family: 'Press Start 2P' !important;
    }
</style>