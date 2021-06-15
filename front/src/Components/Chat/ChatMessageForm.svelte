<script lang="ts">
    import {chatMessagesStore} from "../../Stores/ChatStore";

    let newMessageText = '';

    function saveMessage() {
        chatMessagesStore.addPersonnalMessage(newMessageText);
        newMessageText = '';
    }
</script>

<form on:submit|preventDefault={saveMessage}>
    <input type="text" bind:value={newMessageText} placeholder="Type here"><button type="submit">Send</button>
</form>

<style>
    * {
        font-family: 'Press Start 2P' !important;
    }
</style>